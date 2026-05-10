
import { Lesson, proficiencyLevel } from "../../types";

export const culturalHeritageB1: Partial<Lesson> = {
  title: "Cultural Heritage Narratives",
  titleAr: "سرديات التراث الثقافي",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Explore global traditions and social norms through reading short historical and cultural narratives.",
    missionAr: "استكشاف التقاليد العالمية والأعراف الاجتماعية من خلال قراءة سرديات تاريخية وثقافية قصيرة.",
    objectives: [
      "Identify the 3 main types of cultural narratives (Myth, Legend, Folktale).",
      "Scan for time-specific vocabulary (Ancient, Era, Tradition).",
      "Compare two different cultural views in a text."
    ],
    objectivesAr: [
      "تحديد الأنواع الثلاثة للسرديات الثقافية (الأسطورة، الملحمة، الحكاية الشعبية).",
      "البحث عن مفردات مرتبطة بالزمن (قديم، عصر، تقليد).",
      "مقارنة وجهتي نظر ثقافيتين مختلفتين في نص واحد."
    ]
  },
  content: `
### 1. Types of Cultural Stories (أنواع القصص الثقافية)
*   **Myth (أسطورة):** A traditional story explaining a natural phenomenon (e.g., how the stars were made).
*   **Legend (ملحمة):** A story about a real hero from the past, often exaggerated.
*   **Folktale (حكاية شعبية):** A story passed from person to person within a culture (e.g., Cinderella).

### 2. Reading Social Norms (قراءة الأعراف الاجتماعية)
When reading about a new culture, look for words describing **Etiquette** (Social rules).
*   *Respect:* "In some cultures, people bow to show respect."
*   *Hospitality:* "Welcoming guests with tea is a common tradition."

### 3. Key Vocabulary (مفردات جوهرية)
| Term | Meaning | Arabic |
| :--- | :--- | :--- |
| **Ancestor** | A person from whom you are descended. | سلف / جد قديم |
| **Legacy** | Something left behind for the future. | إرث |
| **Custom** | A traditional way of doing something. | عُرف / عادة |

> **Graphic Rule:** Symbols (flags, clothes, food) in a text help identify the cultural context quickly.
`,
  contentAr: `
### 1. أنواع القصص الثقافية (Types of Stories)
*   **الأسطورة (Myth):** قصة تقليدية تشرح ظاهرة طبيعية.
*   **الملحمة (Legend):** قصة عن بطل حقيقي من الماضي، غالباً ما تكون مبالغاً فيها.
*   **الحكاية الشعبية (Folktale):** قصة تنتقل من شخص لآخر داخل الثقافة (مثل حكايات الشعوب).

### 2. قراءة الأعراف الاجتماعية (Social Norms)
عند القراءة عن ثقافة جديدة، ابحث عن كلمات تصف **الإتيكيت** أو القواعد الاجتماعية.
*   *الاحترام:* "في بعض الثقافات، ينحني الناس لإظهار الاحترام."
*   *الكرم:* "الترحيب بالضيوف بالشاي هو تقليد شائع."

### 3. مفردات جوهرية (Key Vocabulary)
*   **Heritage (التراث):** ما يرثه المجتمع من الماضي.
*   **Generations (الأجيال):** مجموعات زمنية من البشر (الآباء، الأبناء، الأحفاد).
*   **Tradition (التقليد):** ممارسة مستمرة عبر الزمن.
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the word to its definition.',
      instructionAr: 'صل الكلمة بتعريفها.',
      items: [
        { text: "Ancestor", answer: "A family member from long ago" },
        { text: "Custom", answer: "A traditional habit" },
        { text: "Legacy", answer: "What we leave for the future" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which type of story explains natural phenomena?",
      questionAr: "أي نوع من القصص يشرح الظواهر الطبيعية؟",
      options: ["Newspaper", "Myth", "Contract", "Email"],
      optionsAr: ["صحيفة", "أسطورة (Myth)", "عقد", "إيميل"],
      correctIndex: 1,
      explanation: "Myths were created to explain things like rain, fire, or the stars.",
      explanationAr: "الأساطير (Myths) وُجدت لتفسير أشياء مثل المطر أو النار أو النجوم."
    }
  ]
};
