
import { Lesson, proficiencyLevel } from "../../types";

export const singularPluralA1: Partial<Lesson> = {
  title: "Singular and Plural",
  titleAr: "المفرد والجمع",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn the rules for counting objects and expressing quantities in English.",
    missionAr: "تعلم قواعد عد الأشياء والتعبير عن الكميات باللغة الإنجليزية.",
    objectives: [
      "Distinguish between Singular (1) and Plural (2+).",
      "Apply the basic '+s' rule.",
      "Understand the '+es' rule for specific endings.",
      "Identify common irregular plurals."
    ],
    objectivesAr: [
      "التمييز بين المفرد (1) والجمع (2 فأكثر).",
      "تطبيق القاعدة الأساسية بإضافة حرف 's'.",
      "فهم قاعدة إضافة 'es' لبعض النهايات المحددة.",
      "تحديد مجموعات التكسير (الجمع الشاذ) الشائعة."
    ]
  },
  content: `
### 1. Basic Rule: Add 's'
To make most nouns plural in English, we simply add an **-s** to the end.
*   One **car** -> Two **cars**
*   A **book** -> Many **books**
*   My **friend** -> My **friends**

### 2. The 'es' Rule
If a word ends in **-s, -sh, -ch, -x,** or **-z**, we add **-es** to make it easier to pronounce.
*   Bus -> Bus**es**
*   Dish -> Dish**es**
*   Watch -> Watch**es**
*   Box -> Box**es**

### 3. Irregular Plurals
Some words do not follow the 's' rule.
| Singular | Plural | Note |
| :--- | :--- | :--- |
| **Man** | **Men** | Vowel change |
| **Woman** | **Women** | Vowel change |
| **Child** | **Children** | Unique ending |
| **Foot** | **Feet** | Double 'o' to 'e' |
| **Tooth** | **Teeth** | Double 'o' to 'e' |
| **Person** | **People** | Different word |
`,
  contentAr: `
### 1. القاعدة الأساسية: إضافة S
في الإنجليزية، نحول المفرد إلى جمع بإضافة حرف **s** في نهاية الكلمة.
*   سيارة -> سيارات.

### 2. قاعدة إضافة ES
إذا انتهت الكلمة بأحد هذه الحروف (s, sh, ch, x, z)، نضيف **es** بدلاً من s فقط.
*   صندوق -> صناديق.
*   ساعة -> ساعات.

### 3. الجمع الشاذ
هذه كلمات "تكسير" لا تتبع قاعدة الـ S ويجب حفظها:
*   طفل تصبح أطفال.
*   رجل تصبح رجال.
*   شخص تصبح ناس.

> **تنبيه:** لا نستخدم أدوات التنكير مع الجمع أبداً. لا تقل "أ سيارات"، قل فقط "سيارات".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Write the plural form of the word in brackets.',
      instructionAr: 'اكتب صيغة الجمع للكلمة التي بين القوسين.',
      items: [
        { text: "I have three _______ (cat).", textAr: "عندي ثلاثة _______ (قطة)." },
        { text: "Look at those _______ (man).", textAr: "انظر إلى هؤلاء _______ (رجل)." },
        { text: "We need five _______ (box).", textAr: "نحتاج إلى خمسة _______ (صندوق)." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the plural of 'Person'?",
      questionAr: "ما هو جمع كلمة 'Person'؟",
      options: ["Persons", "Peoples", "People", "Persones"],
      optionsAr: ["Persons", "Peoples", "People", "Persones"],
      correctIndex: 2,
      explanation: "'People' is the irregular plural of 'person'.",
      explanationAr: "كلمة 'People' هي الجمع الشاذ لكلمة 'person'."
    }
  ]
};
