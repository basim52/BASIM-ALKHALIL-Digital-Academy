
import { Lesson, proficiencyLevel } from "../../types";

export const orderingFoodA1: Partial<Lesson> = {
  title: "Ordering Food at a Restaurant",
  titleAr: "طلب الطعام في المطعم",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn the essential vocabulary and phrases to order a meal and drinks in a cafe or restaurant.",
    missionAr: "تعلم المفردات والعبارات الأساسية لطلب وجبة ومشروبات في مقهى أو مطعم.",
    objectives: [
      "Ask for a table and a menu.",
      "Understand food and drink categories.",
      "Use 'I would like...' to order.",
      "Ask for the bill."
    ],
    objectivesAr: [
      "طلب طاولة وقائمة الطعام.",
      "فهم فئات الأطعمة والمشروبات.",
      "استخدام 'I would like...' للطلب.",
      "طلب الفاتورة."
    ]
  },
  content: `
### 1. Simple Vocabulary
*   **Menu**: Food list.
*   **Waiter / Waitress**: Service staff.
*   **Order**: Selection.
*   **Bill / Check**: Payment.
*   **Customer**: Diner.

### 2. Asking for a Table
*   "A table for two, please."
*   "Can we have a menu?"

### 3. Placing an Order
Always use **"I would like..."** (or: **I'd like...**) to be polite.
*   **Customer:** "I'd like a chicken sandwich, please."
*   **Waiter:** "Anything to drink?"
*   **Customer:** "An orange juice, please."

### 4. Common Phrases
*   **I'm a vegetarian.**
*   **Does it have nuts?**
*   **Can I have the bill, please?**
`,
  contentAr: `
### 1. كلمات تهمك في المطعم
*   المقبلات.
*   الوجبة الرئيسية.
*   الحلى.
*   المشروبات.

### 2. كيف تطلب بأدب؟
بدلاً من قول "أنا أريد"، استخدم العبارة السحرية:
**"أود أن أحصل على..."**
مثال: **"أود الحصول على بيتزا من فضلك."**

### 3. أنواع المشروبات
*   مياه عادية.
*   مياه غازية.
*   قهوة وشاي.

### 4. عند الدفع
*   احتفظ بالباقي.
*   هل يمكنني الدفع بالبطاقة؟

> **قاعدة ذهبية:** كلمات "من فضلك" و "شكراً" هي مفتاح التعامل الراقي في أي مطعم في العالم.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: Bill, Menu, Like, Please.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "I would _______ a cup of coffee, please.", textAr: "أود _______ كوباً من القهوة، من فضلك." },
        { text: "Can I see the _______, please?", textAr: "هل يمكنني رؤية _______ من فضلك؟" },
        { text: "Could we have the _______? We want to pay.", textAr: "هل يمكننا الحصول على _______؟ نريد الدفع." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the POLITE way to order food?",
      questionAr: "ما هي الطريقة المهذبة لطلب الطعام؟",
      options: ["Give me pizza.", "I want burger.", "I'd like a salad, please.", "Bring food now."],
      optionsAr: ["أعطني بيتزا.", "أريد برجر.", "أود سلطة، من فضلك.", "أحضر الطعام الآن."],
      correctIndex: 2,
      explanation: "'I'd like... please' is the most polite and standard structure for ordering.",
      explanationAr: "عبارة 'I'd like... please' هي الهيكل الأكثر تهذيباً ومعيارية للطلب."
    }
  ]
};
