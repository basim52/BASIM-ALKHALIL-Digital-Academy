
import { Lesson, proficiencyLevel } from "../../types";

export const persuasiveSpeakingC1: Partial<Lesson> = {
  title: "Persuasive Speaking: Rhetoric & Impact",
  titleAr: "الخطابة المقنعة: البلاغة والتأثير",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Learn the secrets of persuasive communication, from structural storytelling to the use of rhetorical devices to win over an audience.",
    missionAr: "تعلم أسرار التواصل المقنع، من السرد الهيكلي للقصص إلى استخدام الأدوات البلاغية لكسب الجمهور.",
    objectives: [
      "Use 'The Rule of Three' for impact.",
      "Understand Ethos, Pathos, and Logos.",
      "Master rhetorical questions to guide thought.",
      "Employ powerful verbs and evocative language."
    ],
    objectivesAr: [
      "استخدام 'قاعدة الثلاثة' لإحداث تأثير.",
      "فهم المصداقية، العاطفة، والمنطق (Ethos, Pathos, Logos).",
      "إتقان الأسئلة البلاغية لتوجيه التفكير.",
      "استخدام أفعال قوية ولغة مثيرة للمشاعر."
    ]
  },
  content: `
### 1. The Pillars of Persuasion (أعمدة الإقناع)
*   **Ethos (Credibility):** Why should we trust you? "As an expert with 10 years of experience..."
*   **Pathos (Emotion):** Connecting with the heart. "Imagine a world where..."
*   **Logos (Logic):** Using facts and data. "Research indicates a 30% increase in..."

### 2. The Rule of Three (قاعدة الثلاثة)
People remember things in threes. 
*   *Example:* "Our product is **efficient, affordable, and revolutionary**."
*   *Example:* "We must **plan, act, and succeed**."

### 3. Rhetorical Questions (الأسئلة البلاغية)
Questions where you don't expect an answer, but you make the listener think.
*   "Can we really afford to ignore this crisis?"
*   "Is this the legacy we want to leave behind?"

### 4. Powerful Verb Choices
Avoid weak verbs:
*   Instead of "Make", use **Generate, Construct, Fabricate.**
*   Instead of "Help", use **Empower, Facilitate, Reinforce.**

### 5. Signposting for Impact
Keep your audience on track:
*   **"What I want to emphasize is..."**
*   **"Let's put this into perspective."** (لنضع هذا في منظوره الصحيح).
*   **"Crucially, ..."** / **"Paradoxically, ..."**
`,
  contentAr: `
### 1. البلاغة (Rhetoric)
هي فن الكلام المقنع. في مستوى C1، لا يكفي أن تكون "محقاً"، بل يجب أن تكون "مؤثراً".

### 2. الأدوات البلاغية
*   **Alliteration:** استخدام كلمات تبدأ بنفس الحرف لإحداث جرس موسيقي (**Safe, Sound, and Secure**).
*   **Metaphor:** استبدال المعنى الحقيقي بآخر خيالي للتوضيح.

### 3. المصداقية والمنطق
*   **Ethos:** اذكر خبرتك.
*   **Logos:** اذكر الأرقام.
*   **Pathos:** اذكر قصة إنسانية.

### 4. هيكل الحديث المقنع
1.  **The Hook:** (الخُطّاف) جملة أولى تجذب الانتباه.
2.  **The Problem:** وصف المعضلة.
3.  **The Solution:** عرض حلك.
4.  **Call to Action:** اطلب من الناس فعل شيء ما.

### 5. كلمات القوة (Power Words)
*   **Unprecedented:** غير مسبوق.
*   **Vital:** حيوي / ضروري جداً.
*   **Invaluable:** لا يُقدر بثمن.

> **نصيحة:** التوقفات (**Pauses**) بين الجمل تعطي المستمع فرصة لاستيعاب عمق كلامك. لا تستعجل.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Identify which pillar is used (Ethos, Pathos, Logos).',
      instructionAr: 'حدد أي عمود من أعمدة الإقناع تم استخدامه.',
      items: [
        { text: "\"Statistics show that 90% of users are satisfied.\" -> _______.", textAr: "\"الإحصاءات تظهر أن 90% من المستخدمين راضون.\" -> _______." },
        { text: "\"Think of the hungry children needing our help.\" -> _______.", textAr: "\"فكر في الأطفال الجائعين الذين يحتاجون مساعدتنا.\" -> _______." },
        { text: "\"I have practiced medicine for over 20 years.\" -> _______.", textAr: "\"مارست الطب لأكثر من 20 عاماً.\" -> _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the 'Rule of Three' in speaking?",
      questionAr: "ما هي 'قاعدة الثلاثة' في الخطابة؟",
      options: ["Speaking for 3 minutes", "Using 3 words per sentence", "Grouping ideas/words in sets of three for memory", "Interviewing 3 people"],
      optionsAr: ["التحدث لمدة 3 دقائق", "استخدام 3 كلمات في الجملة", "تجميع الأفكار/الكلمات في مجموعات ثلاثية لسهولة الحفظ", "مقابلة 3 أشخاص"],
      correctIndex: 2,
      explanation: "Triads are psychologically more satisfying and memorable for audiences.",
      explanationAr: "المجموعات الثلاثية (الثلاثيات) تكون أكثر إرضاءً من الناحية النفسية وأسهل في الحفظ للجمهور."
    }
  ]
};
