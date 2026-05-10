
import { Lesson, proficiencyLevel } from "../../types";

export const greetingsA1: Partial<Lesson> = {
  title: "Greetings & Introductions",
  titleAr: "الترحيب والتعريف بالنفس",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to say hello, introduce yourself, and meet new people in English.",
    missionAr: "تعلم كيفية إلقاء التحية، والتعريف بنفسك، ولقاء أشخاص جدد باللغة الإنجليزية.",
    objectives: [
      "Master informal and formal greetings.",
      "Ask 'How are you?' and respond correctly.",
      "Introduce yourself and say where you are from.",
      "Say goodbye and 'nice to meet you'."
    ],
    objectivesAr: [
      "إتقان التحيات الرسمية وغير الرسمية.",
      "سؤال 'كيف حالك؟' والرد بشكل صحيح.",
      "التعريف بنفسك وقول من أين أنت.",
      "الوداع وقول 'سعدت بلقائك'."
    ]
  },
  content: `
### 1. Basic Greetings
| English | Meaning | Usage |
| :--- | :--- | :--- |
| **Hello / Hi** | General greeting | Any time |
| **Good morning** | Greeting before noon | Before 12 PM |
| **Good afternoon** | Greeting after noon | 12 PM - 6 PM |
| **Good evening** | Evening greeting | After 6 PM |

### 2. Introducing Yourself
*   **A:** Hi, my name is Ali. What's your name?
*   **B:** Hello Ali, I'm Sara. Nice to meet you.
*   **A:** Nice to meet you too. Where are you from?
*   **B:** I'm from Egypt. And you?
*   **A:** I'm from London.

### 3. How are you?
Common responses:
*   **I'm fine, thanks.**
*   **I'm good.**
*   **Not bad.**
*   **I'm tired.**

### 4. Saying Goodbye
*   **Goodbye / Bye.**
*   **See you later.**
*   **Have a nice day.**
`,
  contentAr: `
### 1. كيف تبدأ التحية؟
الإنجليزية لغة بسيطة في التحية:
*   **مرحباً:** تستخدم مع الجميع.
*   للأوقات: **صباح الخير**، **يوم سعيد (بعد الظهر)**، **مساء الخير**.

### 2. التعريف بالنفس 
لحفظ الهيكل، تذكر هذه الجمل:
1.  **اسمي...**
2.  **أنا من...**
3.  **سعدت بلقائك.**

### 3. السؤال عن الحال
لا تكتفِ بكلمة واحدة. يمكنك قول:
*   **بخير جداً.**
*   **عظيم!**

### 4. نصيحة للمحادثة
عندما يسألك شخص "من أين أنت؟"، أجب ثم اسأله العبارة نفسها لتستمر المحادثة.

> **تنبيه:** لا تستخدم "تصبح على خير" عند لقاء شخص في الليل، بل استخدم تحية المساء. التمني بنوم هانئ تقال فقط عند الذهاب للنوم أو مغادرة المكان.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the dialogue.',
      instructionAr: 'أكمل الحوار التالي.',
      items: [
        { text: "A: Hello, I'm Ahmed. What's _______?", textAr: "أ: مرحباً، أنا أحمد. ما _______؟" },
        { text: "B: Hi Ahmed, I _______ Sara.", textAr: "ب: مرحباً أحمد، أنا _______ سارة." },
        { text: "A: Nice to _______ you.", textAr: "أ: سعدت بـ _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which one do you say when meeting someone FOR THE FIRST TIME?",
      questionAr: "ماذا تقول عند لقاء شخص للمرة الأولى؟",
      options: ["Good night.", "Nice to meet you.", "How old are you?", "Give me your phone."],
      optionsAr: ["تصبح على خير.", "سعدت بلقائك.", "كم عمرك؟", "أعطني هاتفك."],
      correctIndex: 1,
      explanation: "'Nice to meet you' is the standard polite greeting for new acquaintances.",
      explanationAr: "عبارة 'Nice to meet you' هي التحية المهذبة المعتادة عند التعرف على شخص جديد."
    }
  ]
};
