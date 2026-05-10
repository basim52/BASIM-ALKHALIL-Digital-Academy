
import { Lesson, proficiencyLevel } from "../../types";

export const healthFitnessA2: Partial<Lesson> = {
  title: "Health, Sickness & Fitness",
  titleAr: "الصحة، المرض واللياقة",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to describe common health problems, talk about lifestyle habits, and give simple health advice.",
    missionAr: "تعلم كيفية وصف المشاكل الصحية الشائعة، التحدث عن عادات نمط الحياة، وإعطاء نصائح صحية بسيطة.",
    objectives: [
      "Identify body parts and common illnesses.",
      "Explain symptoms to a doctor (I have a headache, etc.).",
      "Give health advice using 'Should'.",
      "Talk about sports and gym routines."
    ],
    objectivesAr: [
      "تحديد أجزاء الجسم والأمراض الشائعة.",
      "شرح الأعراض للطبيب (عندي صداع، إلخ).",
      "إعطاء نصائح صحية باستخدام 'Should'.",
      "التحدث عن الرياضة والروتين في النادي الرياضي."
    ]
  },
  content: `
### 1. Common Aches and Pains
We use the words **Ache** or **Sore**.
*   **Headache**
*   **Stomach ache**
*   **Toothache**
*   **Backache**
*   **Sore throat**
*   **Cough / Fever**

### 2. At the Doctor
*   **Doctor:** "What's the matter?" or "What are your symptoms?"
*   **Patient:** "I feel sick. I have a high temperature and a bad cough."
*   **Doctor:** "How long have you felt like this?"
*   **Patient:** "Since yesterday."

### 3. Giving Advice
Use **Should / Shouldn't**:
*   "You **should** drink more water."
*   "You **shouldn't** eat too much sugar."
*   "You **should** take this medicine twice a day."

### 4. Fitness and Sports
*   "I **go to the gym** three times a week."
*   "I **play football** on Saturdays."
*   "I **go running** every morning."
*   "I want to **get fit**."
`,
  contentAr: `
### 1. وصف الألم
معظم الآلام تنتهي بكلمة تعني ألم:
*   ألم أذن.
لمشاكل أخرى:
*   عندي برد.
*   عندي إنفلونزا.

### 2. أفعال اللياقة
*   يتمرن.
*   ينقص وزنه.
*   يأكل طعاماً صحياً.

### 3. أجزاء الجسم الأساسية
*   كتف.
*   صدر.
*   ركبة.
*   مرفق.

### 4. عند الصيدلية
*   وصفة طبية.
*   مسكنات آلام.

> **قاعدة ذهبية:** عندما تشعر بألم مفاجئ، يمكنك قول "يؤلمني هنا" مع الإشارة للمكان المصاب.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: headache, should, throat, gym.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "I have a sore _______, I can't speak well.", textAr: "عندي _______ ملتهب، لا أستطيع الكلام جيداً." },
        { text: "You _______ see a doctor if you feel sick.", textAr: "أنت _______ أن ترى طبيباً إذا شعرت بالمرض." },
        { text: "I go to the _______ to lift weights.", textAr: "أذهب لـ _______ لرفع الأثقال." }
      ]
    }
  ],
  quiz: [
    {
      question: "Which word means 'pain in the head'?",
      questionAr: "أي كلمة تعني 'ألم في الرأس'؟",
      options: ["Stomach ache", "Backache", "Headache", "Heartache"],
      optionsAr: ["ألم معدة", "ألم ظهر", "صداع", "ألم قلب"],
      correctIndex: 2,
      explanation: "A headache is specifically pain located in the head region.",
      explanationAr: "كلمة Headache تعني تحديداً الألم الموجود في منطقة الرأس."
    }
  ]
};
