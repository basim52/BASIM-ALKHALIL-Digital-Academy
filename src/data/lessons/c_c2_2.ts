
import { Lesson, proficiencyLevel } from "../../types";

export const ironyHumourC2: Partial<Lesson> = {
  title: "Strategic Irony & Humour",
  titleAr: "السخرية الاستراتيجية والفكاهة",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Explore the sophisticated use of irony, sarcasm, and wit in English-speaking cultures to build rapport or deliver a subtle critique.",
    missionAr: "استكشف الاستخدام المتطور للسخرية، والتهكم، والذكاء في الثقافات المتحدثة بالإنجليزية لبناء علاقة ودية أو تقديم نقد ذكي.",
    objectives: [
      "Distinguish between Sarcasm and Irony.",
      "Use 'Understatement' for comedic effect (British style).",
      "Employ 'Wit' (quick, clever intelligence) in verbal exchanges.",
      "Recognize cultural triggers for humour."
    ],
    objectivesAr: [
      "التمييز بين التهكم والسخرية.",
      "استخدام 'التهوين' (Understatement) لإحداث تأثير كوميدي (الأسلوب البريطاني).",
      "استخدام 'الذكاء اللفظي' (Wit) في المحادثات.",
      "التعرف على المحفزات الثقافية للفكاهة."
    ]
  },
  content: `
### 1. Irony vs. Sarcasm (السخرية والتهكم)
*   **Irony:** A contrast between expectation and reality. (e.g., A fire station burning down).
*   **Sarcasm:** Using irony to mock or convey contempt. (e.g., "Oh, brilliant!" when someone makes a mistake). *Use caution as sarcasm can be seen as rude.*

### 2. The Art of Understatement (التهوين)
Common in British English. Saying something is "not bad" when it is actually excellent.
*   "It's a bit breezy." (During a hurricane).
*   "We've had a minor disagreement." (After a massive argument).

### 3. Wit and Wordplay (الذكاء اللفظي)
Wit involves quick, inventive thinking. It often uses puns (words with two meanings).
*   *Example:* "I'm reading a book on anti-gravity. It's impossible to put down!" (كلمة 'put down' تعني يضعه جانباً أو يغلقه، وتناسب موضوع الجاذبية).

### 4. Self-Deprecating Humour (السخرية من الذات)
Making fun of yourself to seem more likeable and humble.
*   "I'm not saying I'm clumsy, but the floor just hates me."
*   "My singing voice is best suited for a soundproof room."

### 5. Cultural Context
Humour doesn't always translate. 
*   **Deadpan:** Delivering a joke with a completely serious face.
*   **Slapstick:** Physical comedy (less common in sophisticated C2 conversation).
`,
  contentAr: `
### 1. لماذا نتعلم الفكاهة في مستوى C2؟
لأنها أصعب مهارة لغوية. الفكاهة تتطلب معرفة "السياق الثقافي" و"توقيت الكلام".

### 2. الأسلوب البريطاني (Understatement)
عندما يواجه البريطاني مشكلة كارثية، قد يقول: **"We're in a bit of a pickle."** (نحن في مأزق بسيط). هذا النوع من البرود اللفظي يعتبر قمة الرقي والفكاهة هناك.

### 3. الفرق بين التهكم (Sarcasm) والذكاء (Wit)
*   الـ **Sarcasm** قد يكون جارحاً.
*   الـ **Wit** يثير الإعجاب بذكائك اللغوي.

### 4. الـ Deadpan (الكوميديا الجادة)
أن تقول شيئاً مضحكاً جداً وأنت تحافظ على وجه جاد تماماً. هذه مهارة تواصل عالية المستوى.

### 5. محاذير
الفكاهة سلاح ذو حدين. في المواقف الرسمية جداً، التزم بـ **Wit** اللطيف وتجنب السخرية.

> **نصيحة:** شاهد برامج الـ "Stand-up comedy" بالإنجليزية وحاول فهم التلاعب بالألفاظ الذي يثير ضحك الجمهور.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Identify the style: Understatement, Sarcasm, Self-deprecating.',
      instructionAr: 'حدد أسلوب الفكاهة المستخدم.',
      items: [
        { text: "\"I'm a genius for locking my keys in the car.\" -> _______.", textAr: "\"أنا عبقري لأني حبست مفاتيحي داخل السيارة.\" -> _______." },
        { text: "\"I have a small talent for burning water while cooking.\" -> _______.", textAr: "\"لدي موهبة صغيرة في حرق الماء أثناء الطبخ.\" -> _______." },
        { text: "\"It's just a scratch,\" says the man with a broken leg. -> _______.", textAr: "\"إنه مجرد خدش\"، يقول الرجل ذو الرجل المكسورة. -> _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Self-deprecating' humour?",
      questionAr: "ما هي الفكاهة القائمة على 'السخرية من الذات'؟",
      options: ["Laughing at others", "Making fun of yourself", "Telling long jokes", "Using physical comedy"],
      optionsAr: ["الضحك على الآخرين", "السخرية من نفسك", "رواية نكت طويلة", "استخدام كوميديا الحركة"],
      correctIndex: 1,
      explanation: "Self-deprecating humour helps to build trust and shows humility by making light of one's own flaws.",
      explanationAr: "الفكاهة التي تسخر من الذات تساعد في بناء الثقة وتظهر التواضع من خلال الاستهانة بعيوب الشخص الخاصة."
    }
  ]
};
