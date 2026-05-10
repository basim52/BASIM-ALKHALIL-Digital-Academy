
import { Lesson, proficiencyLevel } from "../../types";

export const technicalInnovationC1: Partial<Lesson> = {
  title: "Technical Innovation Literature",
  titleAr: "أدبيات الابتكار التقني",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Analyze high-tech whitepapers, patents, and innovation strategies for future trends and feasibility.",
    missionAr: "تحليل الأوراق البيضاء التقنية، براءات الاختراع، واستراتيجيات الابتكار لاستشراف التوجهات المستقبلية والجدوى.",
    objectives: [
      "Decode the 'Patent' structure (Claims, Specifications).",
      "Understand the logic of 'Scalability' and 'Interoperability'.",
      "Identify the 'Value Proposition' in a tech pitch deck."
    ],
    objectivesAr: [
      "فك رموز هيكل 'براءة الاختراع' (الادعاءات، المواصفات).",
      "فهم منطق 'قابلية التوسع' و 'التوافقية التشغيلية'.",
      "تحديد 'عرض القيمة' في العروض التقديمية التقنية."
    ]
  },
  content: `
### 1. Decoding Tech Whitepapers (فك رموز الأوراق التقنية)
A whitepaper is an authoritative report that informs readers about a complex issue.
*   **Problem Statement:** Detailed technical failure of current tech.
*   **The Architecture:** Logical and math-based layout of the new solution.
*   **Scalability:** How the tech handles 1 million vs 10 users.

### 2. The Language of Disruption (لغة الابتكار الجذري)
Innovation literature uses specific verbs of change:
*   **Upend / Disrupt:** To change an industry completely.
*   **Streamline:** To make a process more efficient.
*   **Leverage:** To use something to its maximum advantage.

### 3. Reading Patents (قراءة براءات الاختراع)
Patents have two critical sections:
1.  **Specification (المواصفات):** Detailed description of how the invention works.
2.  **Claims (الادعاءات):** The specific legal boundaries of what they own. If it's not in the claims, it's not protected.

| Term | Technical Meaning | Arabic |
| :--- | :--- | :--- |
| **Interoperability** | Systems talking to each other. | التوافقية التشغيلية |
| **Latency** | Delay in data transfer. | زمن الوصول / تأخير |
| **Legacy System** | Old, outdated technology still in use. | نظام قديم / موروث |
| **Paradigm** | A typical pattern or model. | نموذج فكري |
`,
  contentAr: `
### 1. الأوراق البيضاء التقنية (Whitepapers)
هي تقارير رسمية تشرح قضية معقدة وحلها التقني.
*   **Scalability (قابلية التوسع):** قدرة النظام على التعامل مع ضغط متزايد.
*   **Architecture:** البناء الهندسي والمنطقي للحل البرمجي.

### 2. لغة الابتكار (Innovation Language)
*   **Streamline:** تبسيط وتسهيل العملية لجعلها أكثر كفاءة.
*   **Leverage:** تعظيم الاستفادة من مورد متاح.

### 3. قراءة براءات الاختراع (Patents)
يجب التمييز بين جزأين:
1.  **المواصفات:** شرح كيف يعمل الاختراع.
2.  **الادعاءات (Claims):** وهي الأهم قانونياً لأنها تحدد ما تمت حمايته بالضبط.

> **نصيحة للقراءة:** في النصوص التقنية، الأفعال التي تصف الحركة (مثل Integrate, Optimize, Deploy) هي مفاتيح فهم العملية الابتكارية.
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the tech term to its definition.',
      instructionAr: 'صل المصطلح التقني بتعريفها.',
      items: [
        { text: "Latency", answer: "Delay in data transfer" },
        { text: "Scalability", answer: "Growing with demand" },
        { text: "Interoperability", answer: "Ability to communicate between systems" },
        { text: "Legacy System", answer: "Old outdated technology" }
      ]
    }
  ],
  quiz: [
    {
      question: "In a patent, which section defines the legal protection boundaries?",
      questionAr: "في براءة الاختراع، أي قسم يحدد حدود الحماية القانونية؟",
      options: ["Specification", "Claims", "Abstract", "Biography"],
      optionsAr: ["المواصفات", "الادعاءات (Claims)", "المستخلص", "السيرة الذاتية"],
      correctIndex: 1,
      explanation: "The 'Claims' section is the most important legal part as it defines exactly what is protected by law.",
      explanationAr: "قسم 'الادعاءات' هو الجزء القانوني الأهم لأنه يحدد بالضبط ما يحميه القانون."
    }
  ]
};
