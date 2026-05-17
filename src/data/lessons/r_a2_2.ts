
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
### 1. Professional Email Structure
In a workplace, emails always follow a fixed pattern.

*   **From:** The sender.
*   **To:** The receiver.
*   **Subject:** The main topic.
*   **Greeting:** "Dear Team," or "Hi [Name],"
*   **Body:** The actual message.
*   **Closing:** "Regards," or "Best,"

### 2. Common Workplace Vocabulary
| Term | Meaning | Use in Reading |
| :--- | :--- | :--- |
| **Meeting** | An organized event | Look for time/date. |
| **Deadline** | Final time for a task | Look for a specific day. |
| **ASAP** | As soon as possible | Means the task is urgent. |
| **Attached** | File included | There is a file to open. |

### 3. Understanding Announcements
Workplace posters often use **Imperatives** (orders).
*   "Please **sign** here."
*   "**Do not** smoke."
*   "**Attend** the meeting at 10 AM."
`,
  contentAr: `
### 1. هيكل البريد الإلكتروني المهني
في بيئة العمل، تتبع الرسائل دائماً نمطاً ثابتاً وواضحاً.

*   **الموضوع:** أهم جزء لمعرفة فحوى الرسالة بسرعة ودقة.
*   **التحية:** نستخدم عبارات رسمية مع الغرباء وعبارات ودية مع الزملاء المقربين.
*   **الخاتمة:** نستخدم عبارات مهنية لإنهاء الرسالة بشكل لائق.

### 2. مفردات تقنية في العمل
*   **الموعد النهائي:** هو الوقت الأخير الذي يجب أن ينتهي فيه العمل المكلف به.
*   **مرفق:** تعني أن هناك ملفاً أو مستنداً إضافياً يجب فتحه مع الرسالة.
*   **في أسرع وقت ممكن:** تعبير يستخدم للإشارة إلى أن المهمة عاجلة جداً.

> **نصيحة للقراءة:** دائماً ابحث عن الأفعال التي تأتي في صيغة الأمر في بداية الجمل في الإعلانات، فهي تخبرك بالمطلوب منك تنفيذه بدقة.
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
  readingText: {
    paragraphs: [
      {
        en: 'In a modern workplace, digital **etiquette** is essential. When sending a message, always include a clear **subject** line. This helps the **recipient** understand the purpose of your email immediately.',
        ar: 'في بيئة العمل الحديثة، **الإتيكيت** الرقمي أمر أساسي. عند إرسال رسالة، قم دائماً بتضمين سطر **موضوع** واضح. هذا يساعد **المستلم** على فهم غرض بريدك الإلكتروني فوراً.'
      },
      {
        en: 'If you have additional files, mention that they are **attached**. For urgent tasks, some people use **ASAP**, which means "As Soon As Possible". However, being polite is always the most effective strategy.',
        ar: 'إذا كان لديك ملفات إضافية، اذكر أنها **مرفقة**. بالنسبة للمهام العاجلة، يستخدم البعض **ASAP**، والتي تعني "في أسرع وقت ممكن". ومع ذلك، فإن التحلي بالأدب هو دائماً الاستراتيجية الأكثر فعالية.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Etiquette',
      phonetic: 'ˈetɪket',
      meaningAr: 'إتيكيت / آداب السلوك',
      example: 'Digital etiquette is important for professional success.'
    },
    {
      word: 'Recipient',
      phonetic: 'rɪˈsɪpiənt',
      meaningAr: 'مستلم / متلقي',
      example: 'The recipient of the email was very impressed.'
    },
    {
      word: 'Attached',
      phonetic: 'əˈtætʃt',
      meaningAr: 'مرفق / ملحق',
      example: 'Please find the report attached to this message.'
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
