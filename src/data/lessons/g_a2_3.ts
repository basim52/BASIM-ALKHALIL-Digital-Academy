
import { Lesson, proficiencyLevel } from "../../types";

export const comparisonA2: Partial<Lesson> = {
  title: "Comparatives & Superlatives",
  titleAr: "المقارنة والتفضيل",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to compare two or more things and describe which one is 'the best'.",
    missionAr: "تعلم كيفية المقارنة بين شيئين أو أكثر ووصف أيهما هو 'الأفضل'.",
    objectives: [
      "Form Comparative adjectives (+er or more).",
      "Form Superlative adjectives (+est or most).",
      "Learn Irregular forms (Good/Better/Best).",
      "Compare products and places."
    ],
    objectivesAr: [
      "صياغة صفات المقارنة (إضافة er أو more).",
      "صياغة صفات التفضيل (إضافة est أو most).",
      "تعلم الصيغ الشاذة (Good/Better/Best).",
      "المقارنة بين المنتجات والأماكن."
    ]
  },
  content: `
### 1. Comparatives
We use comparatives to compare two things.
*   **Short words:** Add **-er + than**.
    *   *Fast -> Fast**er** than.*
    *   *Small -> Small**er** than.*
*   **Long words (2+ syllables):** Use **more + adjective + than**.
    *   *Beautiful -> **More** beautiful than.*
    *   *Expensive -> **More** expensive than.*

### 2. Superlatives
We use superlatives to say one thing is at the top of a group.
*   **Short words:** Use **The + adjective + est**.
    *   *Fast -> **The** fast**est**.*
    *   *Small -> **The** small**est**.*
*   **Long words:** Use **The most + adjective**.
    *   *Beautiful -> **The most** beautiful.*

### 3. Irregular Adjectives
These don't follow the rules:
| Adjective | Comparative | Superlative |
| :--- | :--- | :--- |
| **Good** | **Better** | **The Best** |
| **Bad** | **Worse** | **The Worst** |
| **Far** | **Farther** | **The Farthest** |

### 4. Spelling Note
If the word ends in "y", change it to "i": *Happy -> Happ**i**er / The Happ**i**est.*
`,
  contentAr: `
### 1. المقارنة
للمقارنة بين شخصين أو شيئين:
*   الكلمات القصيرة: أضف نهاية معينة وتتبعها أداة المقارنة.
    *   علي أطول من أحمد.
*   الكلمات الطويلة: التي لها أكثر من مقطع صوته، نضع قبلها أداة تعني "أكثر".

### 2. التفضيل
للمقارنة بين واحد ومجموعة كاملة:
*   الكلمات القصيرة: نضع قبلها أداة تعريف ونضيف لنهايتها إضافة تدل على التفضيل.
    *   أكبر مدينة.
*   الكلمات الطويلة: نستخدم أداة تعني "الأكثر".
    *   أشهر ممثل.

### 3. صفات شاذة للاستخدام اليومي
*   أفضل.
*   الأفضل.
*   أسوأ.
*   الأسوأ.

> **قاعدة ذهبية:** دائماً تذكر أن المقارنة تحتاج لشخصين أو شيئين، أما التفضيل فنحن نتحدث عن شخص واحد أو شيء واحد مميز في مجموعة كاملة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentence with the correct form.',
      instructionAr: 'أكمل الجملة بالصيغة الصحيحة للصفة.',
      items: [
        { text: "A plane is _______ (fast) than a train.", textAr: "الطائرة هي _______ (أسرع) من القطار." },
        { text: "Mount Everest is the _______ (high) mountain.", textAr: "جبل إيفرست هو _______ (أعلى) جبل." },
        { text: "My health is _______ (good) than last year.", textAr: "صحتي هي _______ (أفضل) من العام الماضي." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which of these is correct for a long word?",
      questionAr: "أي من هذه الخيارات صحيح للكلمات الطويلة؟",
      options: ["Most beautifuler", "More beautifulest", "The most beautiful", "Beautifuler than"],
      optionsAr: ["Most beautifuler", "More beautifulest", "The most beautiful", "Beautifuler than"],
      correctIndex: 2,
      explanation: "With long adjectives, we use 'the most' for the superlative form.",
      explanationAr: "مع الصفات الطويلة، نستخدم 'the most' لصيغة التفضيل."
    }
  ]
};
