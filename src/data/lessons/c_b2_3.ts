
import { Lesson, proficiencyLevel } from "../../types";

export const businessMeetingsB2: Partial<Lesson> = {
  title: "Business Meetings & Etiquette",
  titleAr: "اجتماعات العمل وآدابها",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn the specific language needed to open, lead, participate in, and close a professional meeting.",
    missionAr: "تعلم اللغة المحددة اللازمة لافتتاح، قيادة، المشاركة في، وإنهاء اجتماع مهني.",
    objectives: [
      "Use opening phrases for meetings (get down to business).",
      "Explain the agenda and objectives.",
      "Ask for clarification politely (Could you clarify...?).",
      "Master the language of negotiation and compromise."
    ],
    objectivesAr: [
      "استخدام عبارات افتتاح الاجتماعات (بدء العمل الجاد).",
      "شرح جدول الأعمال والأهداف.",
      "طلب التوضيح بأدب (هل يمكنك توضيح...؟).",
      "إتقان لغة التفاوض والتسوية."
    ]
  },
  content: `
### 1. Opening the Meeting
*   **"Thank you all for coming."**
*   **"Let's get down to business."** (لنبدأ العمل الجاد).
*   **"The main objective of today's meeting is..."**

### 2. Following the Agenda (الالتزام بجدول الأعمال)
*   **"First, let's look at..."**
*   **"Moving on to the next item on the agenda..."** (بالانتقال للنقطة التالية...).
*   **"To go back to what we were saying earlier..."**

### 3. Asking for Clarification
Don't say "I don't understand". Use:
*   **"Could you elaborate on that?"** (هل يمكنك التوسع في ذلك؟).
*   **"Could you clarify what you mean by...?"**
*   **"If I understand correctly, you're saying that..."** (تأكيد الفهم).

### 4. Negotiating & Compromise
*   **"I'm willing to consider that, provided that..."**
*   **"Let's meet halfway."** (لنلتقِ في المنتصف / لنصل لتسوية).
*   **"What are your thoughts on this proposal?"**

### 5. Closing the Meeting
*   **"Let's wrap things up."** (لننهِ الأمور).
*   **"To summarize the main points..."**
*   **"I'll send the minutes of the meeting by tomorrow."** (سأرسل محضر الاجتماع).
`,
  contentAr: `
### 1. مصطلحات الاجتماعات
*   **Agenda:** جدول الأعمال.
*   **Minutes of the meeting:** محضر الاجتماع (الملخص).
*   **Collaborate:** يتعاون.
*   **Brainstorm:** عصف ذهني.

### 2. كيف تتدخل في النقاش؟
*   **"May I interrupt for a moment?"** (هل يمكنني المقاطعة لحظة؟).
*   **"I'd like to add something here."**

### 3. التعبير عن الموافقة المشروطة
*   **"I agree in principle, but..."** (أوافق من حيث المبدأ، ولكن...).

### 4. وضع خطة عمل (Action Plan)
*   **"Who is responsible for this task?"**
*   **"What is the deadline?"** (ما هو الموعد النهائي؟).

### 5. ثقافة الاجتماعات
الالتزام بالوقت (**Punctuality**) هو أهم صفة في اجتماعات العمل الدولية.

> **نصيحة:** إذا كنت المضيف لللقاء، ابدأ دائماً بـ: **"Has everyone received a copy of the agenda?"**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: elaborate, agenda, minutes, objectives.',
      instructionAr: 'أكمل الجمل بالكلمات المناسبة.',
      items: [
        { text: "Has everyone seen the _______ for today's meeting?", textAr: "هل رأى الجميع _______ لاجتماع اليوم؟" },
        { text: "Could you _______ on your last point, please?", textAr: "هل يمكنك _______ في نقطتك الأخيرة، من فضلك؟" },
        { text: "She is taking the _______ of the meeting.", textAr: "هي تقوم بكتابة _______ الاجتماع." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'To get down to business' mean?",
      questionAr: "ماذا تعني عبارة 'To get down to business'؟",
      options: ["To buy a new shop", "To start the main work/topic", "To close the office", "To go home"],
      optionsAr: ["شراء متجر جديد", "بدء العمل/الموضوع الرئيسي", "إغلاق المكتب", "الذهاب للمنزل"],
      correctIndex: 1,
      explanation: "It's an idiom used to stop small talk and start working on the serious task.",
      explanationAr: "هو مصطلح يُستخدم لإيقاف الأحاديث الجانبية والبدء في المهمة الجادة."
    }
  ]
};
