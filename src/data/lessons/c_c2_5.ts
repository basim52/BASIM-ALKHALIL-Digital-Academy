
import { Lesson, proficiencyLevel } from "../../types";

export const linguisticFlexibilityC2: Partial<Lesson> = {
  title: "Linguistic Flexibility & Register",
  titleAr: "المرونة اللغوية ومستويات اللغة",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Master the ability to seamlessly switch between formal, academic, neutral, and casual registers based on the listener and context.",
    missionAr: "إتقان القدرة على التنقل بسلاسة بين المستويات الرسمية، الأكاديمية، المحايدة، وغير الرسمية بناءً على المستمع والسياق.",
    objectives: [
      "Identify the 'Tone' of a conversation.",
      "Convert casual slang into formal academic language (and vice versa).",
      "Understand 'Code-switching' and its social implications.",
      "Master the subtle use of 'Fillers' in different registers."
    ],
    objectivesAr: [
      "تحديد 'نغمة' المحادثة.",
      "تحويل العامية إلى لغة أكاديمية رسمية (والعكس).",
      "فهم 'التبديل اللغوي' وآثاره الاجتماعية.",
      "إتقان استخدام 'كلمات الحشو' في المستويات اللغوية المختلفة."
    ]
  },
  content: `
### 1. Understanding Register (مستويات اللغة)
Register is the variety of language used for a particular purpose or social setting.
*   **Formal:** Research papers, legal documents, diplomatic meetings.
*   **Neutral:** News reports, standard business emails.
*   **Casual:** Friends, family, social media.
*   **Colloquial / Slang:** Specific groups (e.g., teenagers, Londoners).

### 2. Converting Ideas
**Casual:** "The boss got really mad because we were late."
**Formal:** "The Director expressed significant dissatisfaction regarding our lack of punctuality."

**Casual:** "I think this plan is okay, but it might not work."
**Formal:** "While the proposed strategy is fundamentally sound, its long-term viability remains questionable."

### 3. Code-Switching
The ability to change your way of speaking depending on who you are talking to.
*   With a child: Simple words, soft tone.
*   In an interview: Complex syntax, precise vocabulary.
*   At the pub: Colloquial idioms, relaxed grammar.

### 4. Advanced Fillers (كلمات الحشو للعظماء)
Don't say "Uh..." or "Um...". Use:
*   **"To put it another way..."**
*   **"Truth be told, ..."**
*   **"Essentially, what I'm getting at is..."**
*   **"If you will..."** (إن جاز التعبير).
`,
  contentAr: `
### 1. المرونة اللغوية (Flexibility)
في C2، أنت لست "قاموساً متحركاً"، بل أنت "عازف" يعرف متى يرفع النبرة ومتى يخفضها.
*   **Register:** مستوى اللغة.

### 2. التحويل من العامية للفصحى
هذا تمرين رائع لتطوير طلاقتك:
*   **Saying "Yes":**
    *   Casual: **Yup / Yeah.**
    *   Neutral: **Yes, certainly.**
    *   Formal: **Indeed / Quite so.**

### 3. المصطلحات الاجتماعية
*   **Jargon:** مصطلحات تقنية خاصة بمهنة معينة (مثلاً: مصطلحات الأطباء).
*   **Euphemism:** استخدام كلمة لطيفة بدلاً من كلمة جارحة (مثلاً: "passed away" بدلاً من "died").

### 4. فن الـ "Fillers"
الشخص المحترف لا يسكت طويلاً، بل يستخدم عبارات تمنحه وقتاً للتفكير:
*   **"It is fascinating when you consider that..."**

### 5. ختام المنهج (Final Thoughts)
اللغة وسيلة تواصل. الـ C2 هو من يستخدم أفضل الكلمات في أفضل الأماكن ليحول المحادثة إلى فن.

> **نصيحة أخيرة:** لا تكتفِ بالقواعد. استمع للبودكاست، وشاهد الأفلام، وشارك في نقاشات حية لتصقل "المرونة اللغوية".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Convert the casual sentence into a formal one using: dissatisfaction, regarding, punctuality.',
      instructionAr: 'حول الجملة العامية لرسمية باستخدام الكلمات المعطاة.',
      items: [
        { text: "Casual: The boss is angry about us being late. -> Formal: The manager expressed _______ _______ our lack of _______.", textAr: "رسمي: عبر المدير عن _______ بخصوص نقص _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Code-switching'?",
      questionAr: "ما هو الـ 'Code-switching'؟",
      options: ["Switching your computer's password", "Changing the way you speak based on context", "Learning a new coding language", "Translating words in a dictionary"],
      optionsAr: ["تغيير كلمة سر الحاسوب", "تغيير طريقة كلامك بناءً على السياق", "تعلم لغة برمجة جديدة", "ترجمة الكلمات في القاموس"],
      correctIndex: 1,
      explanation: "Code-switching allows a speaker to adapt to social cues and audiences to communicate effectively and build rapport.",
      explanationAr: "تبديل الشفرة اللغوية يسمح للمتحدث بالتكيف مع الإشارات الاجتماعية والجمهور للتواصل بفعالية وبناء الألفة."
    }
  ]
};
