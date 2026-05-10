
import { Lesson, proficiencyLevel } from "../../types";

export const subtextualInferenceB1: Partial<Lesson> = {
  title: "Subtextual Inference",
  titleAr: "الاستنتاج الضمني",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn to read between the lines and understand what is not explicitly stated in a text.",
    missionAr: "تعلم القراءة ما بين السطور وفهم ما لم يتم التصريح به علانية في النص.",
    objectives: [
      "Define 'inference' and 'subtext'.",
      "Identify emotional cues in a dialogue.",
      "Predict a character's next action based on context clues."
    ],
    objectivesAr: [
      "تعريف 'الاستنتاج' و 'الماورائيات'.",
      "تحديد الإشارات العاطفية في الحوار.",
      "توقع الفعل التالي للشخصية بناءً على أدلة السياق."
    ]
  },
  content: `
### 1. What is Inference? (ما هو الاستنتاج؟)
Inference is using **clues** from the text + **your own knowledge** to understand the "hidden" meaning.

*   *Text:* "John looked at his watch and started running."
*   *Clue:* Watch + Running.
*   *Inference:* John is late.

### 2. Reading Tone and Mood (قراءة النبرة والمزاج)
In B1 texts, authors use specific words to suggest how someone feels without saying it directly.

| Word Clues | Suggested Mood |
| :--- | :--- |
| "Slammed the door" | Angry / Frustrated |
| "Sighed deeply" | Sad / Tired |
| "Avoided eye contact" | Nervous / Guilty |

> **Formula/Rule:**
> **Evidence (from text) + Logic (common sense) = Inference**

### 3. Understanding Subtext in Emails (فهم الضمني في الرسائل)
Professional emails often have a subtext of urgency or dissatisfaction.
*   *Text:* "I am still waiting for the report."
*   *Subtext:* I am unhappy because you are late.
`,
  contentAr: `
### 1. ما هو الاستنتاج الضمني؟ (Subtextual Inference)
الاستنتاج هو استخدام **الأدلة** من النص + **خلفيتك المعرفية** لفهم المعنى "المخفي".

*   *النص:* "نظر جون إلى ساعته وبدأ يركض."
*   *الدليل:* الساعة + الركض.
*   *الاستنتاج:* جون متأخر.

### 2. قراءة النبرة والمزاج (Tone and Mood)
في نصوص المستوى B1، يستخدم الكتاب كلمات معينة للاقتراح بمشاعر الشخصية دون التصريح بها.

| الدليل اللفظي | المزاج المقترح |
| :--- | :--- |
| "أغلق الباب بقوة" | غاضب / محبط |
| "تنهد بعمق" | حزين / متعب |
| "تجنب النظر في العين" | متوتر / يشعر بالذنب |

> **قاعدة ذهبية:**
> **الدليل (من النص) + المنطق (العقل العام) = الاستنتاج.**

### 3. الماورائيات في سياق العمل (Workplace Subtext)
غالبًا ما تحمل رسائل البريد المهنية معنىً ضمنياً بالعجلة أو عدم الرضا.
*   *النص:* "ما زلت أنتظر التقرير."
*   *المعنى الضمني:* أنا لست راضياً لأنك تأخرت.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'What is the subtext?',
      instructionAr: 'ما هو المعنى الضمني؟',
      items: [
        { 
          text: "Text: 'The sky turned dark and people opened their umbrellas.' What is happening?", 
          textAr: "النص: 'أظلمت السماء وفتح الناس مظلاتهم.' ماذا يحدث؟",
          options: ["It is a sunny day", "It is going to rain", "It is nighttime"],
          optionsAr: ["يوم مشمس", "سوف تمطر", "هذا وقت الليل"],
          answer: "It is going to rain"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "If a colleague says 'This project is... interesting', and they look confused, what is the subtext?",
      questionAr: "إذا قال زميلك 'هذا المشروع... مثير للاهتمام'، وكان يبدو عليه الارتباك، فما هو المعنى الضمني؟",
      options: ["They love it", "They think it's confusing/bad", "They are excited", "They want to join"],
      optionsAr: ["يحبونه جداً", "يعتقدون أنه مربك أو سيء", "هم متحمسون", "يريدون الانضمام"],
      correctIndex: 1,
      explanation: "Using 'interesting' with a confused look often implies a negative or mixed opinion.",
      explanationAr: "استخدام كلمة 'interesting' مع نظرة ارتباك غالباً ما يعني رأياً سلبياً أو مختلطاً."
    }
  ]
};
