
import { Lesson, proficiencyLevel } from "../../types";

export const workplaceCultureA2: Partial<Lesson> = {
  title: "Workplace Functional Culture",
  titleAr: "الثقافة الوظيفية في بيئة العمل",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Understand the basics of reading professional emails and workplace announcements.",
    missionAr: "فهم أساسيات قراءة رسائل البريد الإلكتروني المهنية وإعلانات مكان العمل.",
    objectives: [
      "Recognize the structure of a professional email (To, From, Subject).",
      "Identify the main request in a short memo.",
      "Understand time and location in meeting invitations."
    ],
    objectivesAr: [
      "تمييز هيكل البريد الإلكتروني المهني (إلى، من، الموضوع).",
      "تحديد الطلب الرئيسي في المذكرات القصيرة.",
      "فهم الوقت والموقع في دعوات الاجتماعات."
    ]
  },
  content: `
### 1. Professional Email Structure (هيكل الإيميل)
In a workplace, emails always follow a fixed pattern.

*   **From:** The sender (المرسل).
*   **To:** The receiver (المستقبل).
*   **Subject:** The main topic (الموضوع).
*   **Greeting:** "Dear Team," or "Hi [Name]," (التحية).
*   **Body:** The actual message (محتوى الرسالة).
*   **Closing:** "Regards," or "Best," (الخاتمة).

### 2. Common Workplace Vocabulary (مفردات العمل)
| Term | Meaning | Use in Reading |
| :--- | :--- | :--- |
| **Meeting** | اجتماع | Look for time/date. |
| **Deadline** | الموعد النهائي | Look for a specific day. |
| **ASAP** | في أقرب وقت | Means the task is urgent. |
| **Attached** | مرفق | There is a file to open. |

> **Formula/Rule:**
> **Action + Deadline**
> *Please finish the report [Action] by Friday [Deadline].*

### 3. Understanding Announcements (فهم الإعلانات)
Workplace posters often use **Imperatives** (orders).
*   "Please **sign** here."
*   "**Do not** smoke."
*   "**Attend** the meeting at 10 AM."
`,
  contentAr: `
### 1. هيكل البريد الإلكتروني المهني (Email Structure)
في العمل، تتبع الرسائل دائماً نمطاً ثابتاً.

*   **Subject (الموضوع):** أهم جزء لمعرفة محتوى الرسالة بسرعة.
*   **Greeting (التحية):** نستخدم "Dear" للرسمية و "Hi" للزملاء المقربين.
*   **Closing (الخاتمة):** نستخدم "Regards" أو "Sincerely".

### 2. مفردات تقنية في العمل (Vocabulary)
*   **Deadline:** هو الوقت الذي يجب أن تنتهي فيه من العمل.
*   **Attached:** تعني أن هناك ملفاً (صورة أو مستند) مع الرسالة.
*   **ASAP:** اختصار لـ "As Soon As Possible" أي "في أسرع وقت ممكن".

> **نصيحة للقراءة:** دائماً ابحث عن الفعل في بداية الجملة في الإعلانات، فهو يخبرك بما يجب عليك فعله (مثلاً: Submit, Attend, Finish).
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the email part to its content.',
      instructionAr: 'صل جزء الإيميل بمحتواه المناسب.',
      items: [
        { text: "Subject", answer: "Meeting at 10AM" },
        { text: "Greeting", answer: "Dear Mr. Smith," },
        { text: "Closing", answer: "Best regards," },
        { text: "Action", answer: "Please print the file" }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Attached' mean in an email?",
      questionAr: "ماذا تعني كلمة 'Attached' في البريد الإلكتروني؟",
      options: ["The message is long", "A file is included", "The email is urgent", "The person is busy"],
      optionsAr: ["الرسالة طويلة", "هناك ملف مشمول", "الإيميل عاجل", "الشخص مشغول"],
      correctIndex: 1,
      explanation: "Attached refers to files sent with the email.",
      explanationAr: "تعني وجود ملف مرفق مع الرسالة."
    },
    {
      question: "If a deadline is 'ASAP', when should you do it?",
      questionAr: "إذا كان الموعد النهائي 'ASAP'، متى يجب عليك إنجازه؟",
      options: ["Next month", "Next week", "Immediately", "In a few days"],
      optionsAr: ["الشهر القادم", "الأسبوع القادم", "فوراً", "خلال أيام قليلة"],
      correctIndex: 2,
      explanation: "ASAP means As Soon As Possible (right now).",
      explanationAr: "تعني في أسرع وقت ممكن أو فوراً."
    }
  ]
};
