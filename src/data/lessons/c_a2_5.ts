
import { Lesson, proficiencyLevel } from "../../types";

export const hobbiesA2: Partial<Lesson> = {
  title: "Hobbies & Interests",
  titleAr: "الهوايات والاهتمامات",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to talk about your free time activities, express likes and dislikes, and share your passions.",
    missionAr: "تعلم كيفية التحدث عن أنشطة وقت الفراغ، التعبير عن الإعجاب وعدم الإعجاب، ومشاركة شغفك.",
    objectives: [
      "Use verbs like 'love', 'enjoy', 'like', and 'hate'.",
      "List common hobbies (photography, reading, gaming).",
      "Use 'I'm interested in...' to show passion.",
      "Ask 'What do you do in your free time?'"
    ],
    objectivesAr: [
      "استخدام أفعال مثل 'أحب'، 'أستمتع'، 'أكره'.",
      "سرد الهوايات الشائعة (التصوير، القراءة، الألعاب).",
      "استخدام 'I'm interested in...' لإظهار الشغف.",
      "سؤال 'ماذا تفعل في وقت فراغك؟'"
    ]
  },
  content: `
### 1. Talking About Likes
We use verbs followed by **-ing** or a noun.
*   **I love...**
*   **I'm into...**
*   **I enjoy...**
*   **I'm interested in...**

*Example:* "I **love taking** photos."
*Example:* "I **enjoy playing** video games."

### 2. Talking About Dislikes
*   **I don't like...**
*   **I find it boring.**
*   **I'm not interested in...**
*   **I hate...**

### 3. Common Hobbies
*   **Photography**
*   **Volunteering**
*   **Cooking**
*   **Traveling**
*   **Collecting things**
*   **Playing an instrument**

### 4. Asking Others
*   **What are your hobbies?**
*   **What do you do for fun?**
*   **How often do you do it?**
*   **Are you good at it?**
`,
  contentAr: `
### 1. مستويات الإعجاب
1.  أنا مجنون بـ... (أعلى درجة من الإعجاب).
2.  أنا معجب كبير بـ...
3.  الأمر لا بأس به.

### 2. القاعدة الذهبية لقواعد اللغة
بعد أفعال المشاعر، غالباً ما نضيف نهاية معينة للفعل للدلالة على الاسم (المصدر).
*   أنا أحب القراءة.
*   أنا أستمتع بالطبخ.

### 3. التحدث عن التكرار
*   دائماً.
*   أحياناً.
*   مرة في الأسبوع.
*   نادراً جداً.

### 4. لماذا تحب هذه الهواية؟
*   لأنها تبعث على الاسترخاء.
*   لأنها مثيرة.
*   لأنها تبقيني لائقاً بدنياً.

> **نصيحة:** لتبدو لغتك طبيعية، حاول ألا تجيب بكلمة واحدة، بل أعطِ سبباً لإعجابك بالهواية.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in the blanks using: into, enjoy, hate, fan.',
      instructionAr: 'املأ الفراغات بالكلمة المناسبة.',
      items: [
        { text: "I really _______ cooking for my friends.", textAr: "أنا حقاً _______ الطبخ لأصدقائي." },
        { text: "I'm not _______ football; I prefer tennis.", textAr: "أنا لست _______ بكرة القدم؛ أفضل التنس." },
        { text: "I'm a big _______ of Marvel movies.", textAr: "أنا _______ كبير لأفلام مارفل." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which expression shows the MOST passion for a hobby?",
      questionAr: "أي تعبير يظهر أكبر قدر من الشغف بهواية ما؟",
      options: ["I like it.", "It's okay.", "I'm crazy about it.", "I don't mind it."],
      optionsAr: ["أحبها.", "لا بأس بها.", "أنا مجنون بها.", "لا أمانعها."],
      correctIndex: 2,
      explanation: "'I'm crazy about it' expresses intense enthusiasm and excitement.",
      explanationAr: "تعبير 'I'm crazy about it' يعبر عن حماس وشغف شديدين."
    }
  ]
};
