
import { Lesson, proficiencyLevel } from "../../types";

export const familyHomeA1: Partial<Lesson> = {
  title: "My Family & Home",
  titleAr: "عائلتي ومنزلي",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to talk about your family members and describe the rooms and objects in your home.",
    missionAr: "تعلم كيفية التحدث عن أفراد عائلتك ووصف الغرف والأشياء الموجودة في منزلك.",
    objectives: [
      "Name family members (father, mother, sibling, etc.).",
      "Describe your house (rooms and floors).",
      "Use possessive adjectives (my, your, his, her).",
      "Ask 'Who is this?' and 'Where is...?'"
    ],
    objectivesAr: [
      "تسمية أفراد العائلة.",
      "وصف منزلك (الغرف والطوابق).",
      "استخدام صفات الملكية (my, your, his, her).",
      "سؤال 'من هذا؟' و 'أين هو...؟'"
    ]
  },
  content: `
### 1. Family Members
*   **Father / Dad**
*   **Mother / Mom**
*   **Brother / Sister**
*   **Grandfather / Grandmother**
*   **Husband / Wife**
*   **Son / Daughter**

### 2. Possession
*   This is **my** brother.
*   That is **his** car.
*   **Her** name is Elena.

### 3. The House
| Room | Meaning | Objects |
| :--- | :--- | :--- |
| **Living room** | General space | Sofa, TV |
| **Kitchen** | Cooking area | Fridge, Stove |
| **Bedroom** | Sleeping area | Bed, Wardrobe |
| **Bathroom** | Washing area | Shower, Sink |

### 4. Simple Dialogue
*   **A:** Who is this?
*   **B:** This is my sister. Her name is Mary.
*   **A:** Is your family large?
*   **B:** No, it's small. Just my parents and me.
*   **A:** Where is the cat?
*   **B:** It's in the kitchen.
`,
  contentAr: `
### 1. شجرة العائلة
لحفظ الكلمات، تذكر الثنائيات:
*   الأخ والأخت.
*   الابن والابنة.
*   الوالدين.

### 2. صفات الملكية
هي كلمات صغيرة تسبق الشيء لتخبرنا لمن هو:
*   لي (كتابي).
*   لك.
*   له (للمذكر).
*   لها (للمؤنث).

### 3. غرف المنزل
*   الطابق العلوي.
*   الطابق السفلي.
*   الحديقة.

### 4. سؤال وجواب
*   سؤال: كم شخصاً في عائلتك؟
*   جواب: هناك خمسة أشخاص في عائلتي.

> **نصيحة:** عندما تصف مكان شيء في المنزل، استخدم حروف الجر البسيطة: داخل، على، تحت.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in with the correct word (my, his, her, brother, kitchen).',
      instructionAr: 'املأ الفراغ بالكلمة الصحيحة.',
      items: [
        { text: "This is Ali. _______ car is blue.", textAr: "هذا علي. سيارته _______ زرقاء." },
        { text: "My mother is in the _______ cooking dinner.", textAr: "أمي في _______ تطبخ العشاء." },
        { text: "I have one _______ and two sisters.", textAr: "لدي _______ واحد وأختان." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which room is used for SLEEPING?",
      questionAr: "أي غرفة تُستخدم للنوم؟",
      options: ["Kitchen", "Living room", "Bedroom", "Bathroom"],
      optionsAr: ["المطبخ", "غرفة المعيشة", "غرفة النوم", "الحمام"],
      correctIndex: 2,
      explanation: "The bedroom (from 'bed') is specifically for sleeping.",
      explanationAr: "غرفة النوم (bedroom من كلمة سرير bed) مخصصة للنوم."
    }
  ]
};
