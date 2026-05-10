
import { Lesson, proficiencyLevel } from "../../types";

export const presentPerfectB1: Partial<Lesson> = {
  title: "Present Perfect: Experiences",
  titleAr: "المضارع التام: الخبرات والتجارب",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to talk about things you have done in your life without saying exactly when.",
    missionAr: "تعلم كيفية التحدث عن أشياء قمت بها في حياتك دون تحديد وقت وقوعها بالضبط.",
    objectives: [
      "Form the Present Perfect (Have/Has + V3).",
      "Use 'Ever' and 'Never' for life experiences.",
      "Distinguish between Past Simple (Specific time) and Present Perfect (Unspecified).",
      "Master the Past Participle of common verbs."
    ],
    objectivesAr: [
      "صياغة المضارع التام (Have/Has + التصريف الثالث).",
      "استخدام 'Ever' و 'Never' لخبرات الحياة.",
      "التمييز بين الماضي البسيط (وقت محدد) والمضارع التام (وقت غير محدد).",
      "إتقان التصريف الثالث للأفعال الشائعة."
    ]
  },
  content: `
### 1. The Structure
To form the Present Perfect, you need: **Have/Has + Past Participle (V3)**.

*   **I / You / We / They** -> **Have** + V3
    *   *I have visited London.*
*   **He / She / It** -> **Has** + V3
    *   *She has finished her work.*

### 2. When to use it?
We use it for actions that happened at an **unspecified** time in the past. The result is what matters now.
*   *Example:* "I have seen that movie." (I know the story now, it doesn't matter when I saw it).

### 3. Ever and Never
*   **Ever:** Used in questions. (*Have you **ever** eaten sushi?*)
*   **Never:** Used for negative experiences. (*I have **never** been to Paris.*)

### 4. Present Perfect vs. Past Simple
| Present Perfect (General) | Past Simple (Specific) |
| :--- | :--- |
| I have seen Ali. | I saw Ali **yesterday**. |
| Have you been to Italy? | Did you go to Italy **in 2010**? |

> **Past Participle (V3) Reminder:**
> *   Regular: play -> play**ed**.
> *   Irregular: go -> **gone**, eat -> **eaten**, see -> **seen**.
`,
  contentAr: `
### 1. هيكل الجملة
يتكون هذا الزمن من فعل مساعد وتصريف ثالث للفعل.
*   لقد أكلت.
*   لقد سافرت.

### 2. الاستخدام (الخبرة السابقة)
نستخدمه عندما نتحدث عن شيء حدث في الماضي، لكن الوقت الدقيق لم يذكر. المهم هو أن الفعل قد تم أو أن أثره موجود الآن.
*   "لقد قرأت هذا الكتاب" -> (لا يهم متى قرأته، المهم أني أعرف محتواه الآن).

### 3. السؤال عن التجارب والنفي
*   أدوات تسأل عما إذا كنت قد قمت بشيء في حياتك.
*   أدوات تنفي وقوع الفعل أبداً.

### 4. الفرق بينه وبين الماضي البسيط
*   الماضي البسيط: يحتاج لتحديد وقت (أمس، الأسبوع الماضي).
*   المضارع التام: الوقت فيه مفتوح وغير محدد.

> **نصيحة:** إذا ذكرت "Yesterday" أو "Last year"، فمن الخطأ استخدام Have. استخدم الماضي البسيط مباشرة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with Have/Has + Past Participle.',
      instructionAr: 'أكمل باستخدام Have/Has والتصريف الثالث للفعل.',
      items: [
        { text: "I _______ (lose) my keys. I can't find them.", textAr: "لقد _______ (فقدت) مفاتيحي. لا أستطيع إيجادها." },
        { text: "_______ you ever _______ (see) a ghost?", textAr: "هل سبق لك وأن _______ (رأيت) شبحاً؟" },
        { text: "Sara _______ (never / taste) Mexican food.", textAr: "سارة _______ (لم تذق أبداً) الطعام المكسيكي." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which sentence is correct for a specific time?",
      questionAr: "أي جملة هي الصحيحة لوصف وقت محدد؟",
      options: ["I have visited my uncle yesterday.", "I visited my uncle yesterday.", "I have visit my uncle yesterday.", "I visiting my uncle yesterday."],
      optionsAr: ["I have visited my uncle yesterday.", "I visited my uncle yesterday.", "I have visit my uncle yesterday.", "I visiting my uncle yesterday."],
      correctIndex: 1,
      explanation: "Since 'yesterday' is specific, we must use the Past Simple 'visited'.",
      explanationAr: "بما أن 'أمس' وقت محدد، يجب استخدام الماضي البسيط 'visited'."
    }
  ]
};
