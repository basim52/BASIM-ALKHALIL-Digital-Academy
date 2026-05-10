
import { Lesson, proficiencyLevel } from "../../types";

export const everydayInteractionLesson: Partial<Lesson> = {
  title: "Everyday Interaction Texts",
  titleAr: "نصوص التفاعل اليومية",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Develop the ability to recognize and understand common short texts encountered in daily life, such as signs, messages, and menus.",
    missionAr: "تطوير القدرة على تمييز وفهم النصوص القصيرة الشائعة في الحياة اليومية، مثل اللوحات الإرشادية، الرسائل القصيرة، والقوائم.",
    objectives: [
      "Interpret 5 core public signs (Entrance, Exit, Pull, Push, Open/Closed).",
      "Identify key information in a basic text message conversation.",
      "Recognize prices and basic items on a simple cafe menu."
    ],
    objectivesAr: [
      "تفسير 5 لوحات إرشادية أساسية (مدخل، مخرج، اسحب، ادفع، مفتوح/مغلق).",
      "تحديد المعلومات الرئيسية في محادثة نصية بسيطة.",
      "التعرف على الأسعار والأصناف الأساسية في قائمة مقهى بسيطة."
    ]
  },
  content: `
### 1. Essential Public Signs (اللوحات العامة الأساسية)
In an English-speaking environment, understanding single-word signs is critical for navigation.

| Sign (اللوحة) | Meaning (المعنى) | Action (الإجراء) |
| :--- | :--- | :--- |
| **PUSH** | ادفع | Push the door forward. |
| **PULL** | اسحب | Pull the door toward you. |
| **OPEN** | مفتوح | The shop is ready for customers. |
| **CLOSED** | مغلق | The shop is not operating. |
| **EXIT** | مخرج | The way out of the building. |

> **Graphic Rule:** Red signs usually mean danger or "Stop", while Green signs often indicate safety or "Exit".

### 2. Digital Text Messages (الرسائل الرقمية)
At level A1, messages are short and focus on "Who, Where, and When".

*Example Conversation:*
*   **User A:** "Hi! Where are you?"
*   **User B:** "I am at the cafe."
*   **User A:** "See you at 5:00 PM."

**Key Vocabulary:**
*   **At**: (في / عند) - used for locations.
*   **See you**: (أراك لاحقاً) - a common closing.

### 3. Reading a Simple Menu (قراءة قائمة بسيطة)
Menus use a "Item — Price" structure.

*   **Coffee** ............ $3.00
*   **Tea** ............... $2.00
*   **Water** ............. $1.00
*   **Cake** .............. $4.50

> **Formula/Rule:** 
> **Subject + Verb + Price** 
> *The coffee is $3.* (القهوة بـ 3 دولارات)
`,
  contentAr: `
### 1. اللوحات العامة الأساسية (Essential Public Signs)
في البيئة الناطقة بالإنجليزية، يعد فهم اللوحات المكونة من كلمة واحدة أمراً حيوياً للتنقل.

| اللوحة | المعنى | الإجراء المتبع |
| :--- | :--- | :--- |
| **PUSH** | ادفع | ادفع الباب للأمام. |
| **PULL** | اسحب | اسحب الباب باتجاهك. |
| **OPEN** | مفتوح | المتجر جاهز لاستقبال الزبائن. |
| **CLOSED** | مغلق | المتجر لا يعمل حالياً. |
| **EXIT** | مخرج | الطريق للخروج من المبنى. |

### 2. الرسائل النصية الرقمية (Digital Text Messages)
في المستوى A1، تكون الرسائل قصيرة وتركز على "من، أين، ومتى".

*محادثة تجريبية:*
*   **الشخص أ:** "مرحباً! أين أنت؟"
*   **الشخص ب:** "أنا في المقهى."
*   **الشخص أ:** "أراك في الساعة 5:00 مساءً."

**مفردات هامة:**
*   **At**: تستخدم لتحديد الموقع (في / عند).
*   **See you**: عبارة ختامية شائعة تعني (أراك لاحقاً).

### 3. قراءة قائمة طعام بسيطة (Reading a Menu)
تستخدم القوائم عادةً هيكل "الصنف — السعر".

*   **Coffee** (قهوة) ............ $3.00
*   **Tea** (شاي) ............... $2.00

> **قاعدة لغوية:** 
> نستخدم فعل الكينونة **is** لوصف السعر:
> *The coffee **is** $3.*
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the sign to its opposite.',
      instructionAr: 'صل اللوحة بعكسها في المعنى.',
      items: [
        { text: "PUSH", answer: "PULL" },
        { text: "OPEN", answer: "CLOSED" },
        { text: "ENTRANCE", answer: "EXIT" },
        { text: "HELLO", answer: "GOODBYE" }
      ]
    },
    {
      type: 'fill',
      instruction: 'Complete the chat using: At, Where, Time.',
      instructionAr: 'أكمل المحادثة باستخدام الكلمات التالية.',
      items: [
        { text: "A: _______ are you? B: I am at home.", textAr: "أ: أين أنت؟ ب: أنا في المنزل." },
        { text: "A: I am _______ the hospital.", textAr: "أ: أنا في المستشفى." },
        { text: "A: What _______ is it? B: It is 10:00.", textAr: "أ: كم الساعة؟ ب: إنها العاشرة." }
      ]
    }
  ],
  quiz: [
    {
      question: "You want to enter a shop. You see a sign 'CLOSED'. What do you do?",
      questionAr: "تريد دخول متجر ورأيت لوحة مكتوب عليها 'CLOSED'. ماذا تفعل؟",
      options: ["Go inside", "Go home", "Push the door", "Wait inside"],
      optionsAr: ["تدخل", "تعود للمنزل", "تدفع الباب", "تنتظر بالداخل"],
      correctIndex: 1,
      explanation: "CLOSED means the shop is not open for business.",
      explanationAr: "كلمة CLOSED تعني أن المتجر مغلق ولا يستقبل الزبائن."
    },
    {
      question: "In a menu: 'Tea ... $2'. How much is the tea?",
      questionAr: "في قائمة طعام: 'Tea ... $2'. كم سعر الشاي؟",
      options: ["Free", "One dollar", "Two dollars", "Ten dollars"],
      optionsAr: ["مجاني", "دولار واحد", "دولاران", "عشرة دولارات"],
      correctIndex: 2,
      explanation: "The price listed is $2 (Two dollars).",
      explanationAr: "السعر الموضح هو دولارين."
    },
    {
      question: "A friend texts you: 'See you at 6:00'. What information is this?",
      questionAr: "صديق أرسل لك: 'See you at 6:00'. ما هي هذه المعلومة؟",
      options: ["A location", "A name", "A price", "A time"],
      optionsAr: ["موقع", "اسم", "سعر", "وقت"],
      correctIndex: 3,
      explanation: "'6:00' indicates a specific time.",
      explanationAr: "التوقيت '6:00' يشير بوضوح إلى الوقت."
    }
  ]
};
