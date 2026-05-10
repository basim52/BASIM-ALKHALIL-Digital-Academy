
import { Lesson, proficiencyLevel } from "../../types";

export const socioPoliticalCritiqueC1: Partial<Lesson> = {
  title: "Socio-Political Critique",
  titleAr: "النقد السوسيو-سياسي",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Analyze how language is used as a tool for social commentary, critique, and power analysis.",
    missionAr: "تحليل كيفية استخدام اللغة كأداة للتعليق الاجتماعي، والنقد، وتحليل موازين القوى.",
    objectives: [
      "Detect 'Ideology' embedded in neutral-sounding texts.",
      "Understand the use of Satire and Irony in social critique.",
      "Identify the 'Power Dynamics' discussed in a political report."
    ],
    objectivesAr: [
      "اكتشاف 'الأيديولوجيا' المنغرسة في النصوص التي تبدو محايدة.",
      "فهم استخدام الهجاء والسخرية في النقد الاجتماعي.",
      "تحديد 'ديناميكيات القوة' التي يناقشها تقرير سياسي."
    ]
  },
  content: `
### 1. Reading Ideology (قراءة الأيديولوجيا)
At C1, you must look beyond what the text *says* to what it *implies* about society.
*   **Hegemony (الهيمنة):** Dominant ideas that society accepts as "natural".
*   **Paradigm Shift (تحول جذري):** A fundamental change in how people think about an issue.

### 2. Satire and Irony (الهجاء والسخرية)
Critics often use humor to attack serious problems.
*   **Satire:** Using humor, irony, or exaggeration to expose stupidity or vice.
*   **Irony:** Saying one thing but meaning the opposite to highlight a paradox.

### 3. Discourse Analysis (تحليل الخطاب)
Critical reading requires asking:
1.  **Who is voice-less?** Which group is not mentioned?
2.  **What is the 'Dichotomy'?** Is the author forcing a "Us vs. Them" logic?
3.  **Institutional Language:** How do organizations use words to hide responsibility?

| Term | Context | Arabic |
| :--- | :--- | :--- |
| **Subjugation** | Bringing someone under control. | إخضاع |
| **Nuance** | A subtle difference in meaning/opinion. | فارق دقيق |
| **Polemic** | A strong verbal or written attack. | سجال / هجوم كلامي |
| **Consensus** | General agreement. | إجماع |
`,
  contentAr: `
### 1. قراءة الأيديولوجيا (Ideology)
في هذا المستوى، يجب عليك تجاوز ما "يقوله" النص إلى ما "يلمح إليه" حول المجتمع.
*   **Hegemony:** الأفكار المهيمنة التي يقبلها المجتمع كـ "أمر طبيعي".
*   **Paradigm Shift:** تغيير جذري في نموذج التفكير السائد.

### 2. السخرية الهادفة (Satire & Irony)
يستخدم النقاد الفكاهة لمهاجمة المشاكل الخطيرة.
*   **Satire:** استخدام المبالغة لكشف الغباء أو الرذيلة.
*   **Irony (المفارقة):** قول شيء وقصد نقيضه لتسليط الضوء على تناقض ما.

### 3. تحليل الخطاب (Discourse)
تتطلب القراءة النقدية سؤال نفسك:
1.  **من هو الصامت؟** أي فئة تم تهميشها في النص؟
2.  **ثنائية نحن ضدهم:** هل يحاول الكاتب تقسيم المجتمع؟

> **نصيحة للقراءة:** النصوص السياسية لا تكون محايدة أبداً. الكلمات التي يختارها الكاتب (مثل "Freedom Fighter" مقابل "Insurgent") تعبر عن موقفه السياسي.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Identify the technique.',
      instructionAr: 'حدد التقنية المستخدمة.',
      items: [
        { 
          text: "When an author describes a terrible situation as 'a slight inconvenience' to mock a government, they are using _______.", 
          textAr: "عندما يصف كاتب موقفاً كارثياً بأنه 'إزعاج بسيط' ليسخر من الحكومة، فإنه يستخدم _______.",
          options: ["Sincerity", "Irony/Satire", "Data Analysis"],
          optionsAr: ["الصدق", "المفارقة/الهجاء (Satire)", "تحليل البيانات"],
          answer: "Irony/Satire"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Hegemony' refer to in social critique?",
      questionAr: "إلى ماذا تشير 'الهيمنة' (Hegemony) في النقد الاجتماعي؟",
      options: ["A type of government", "Dominant ideas accepted as natural", "A military strategy", "A financial debt"],
      optionsAr: ["نوع من الحكومات", "أفكار مهيمنة تُقبل كأمر طبيعي", "استراتيجية عسكرية", "دين مالي"],
      correctIndex: 1,
      explanation: "Hegemony is the influence or authority of one group over others, often through cultural dominance.",
      explanationAr: "الهيمنة هي تأثير أو سلطة مجموعة على أخرى، غالباً من خلال الهيمنة الثقافية."
    }
  ]
};
