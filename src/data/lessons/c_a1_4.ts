
import { Lesson, proficiencyLevel } from "../../types";

export const shoppingA1: Partial<Lesson> = {
  title: "Shopping for Clothes & Food",
  titleAr: "التسوق للملابس والمنتجات",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to ask for prices, sizes, and colors while shopping in different stores.",
    missionAr: "تعلم كيفية السؤال عن الأسعار، المقاسات، والألوان أثناء التسوق في المتاجر المختلفة.",
    objectives: [
      "Ask 'How much is it?'",
      "Name common clothing items and grocery items.",
      "Ask for different sizes and colors.",
      "Understand price numbers (pounds, dollars, euros)."
    ],
    objectivesAr: [
      "سؤال 'بكم هذا؟'.",
      "تسمية قطع الملابس الشائعة والسلع الغذائية.",
      "طلب مقاسات وألوان مختلفة.",
      "فهم أرقام الأسعار (الجنيه، الدولار، اليورو)."
    ]
  },
  content: `
### 1. Store Vocabulary
*   **Price**: Numerical cost.
*   **Size**: Fit (S, M, L, XL).
*   **Fitting room**: Trial area.
*   **Receipt**: Transaction proof.
*   **Cash / Card**: Payment methods.

### 2. Asking About Price
*   **"How much is this shirt?"**
*   **"How much are these shoes?"**
*   **"It's £25."**

### 3. Clothes and Colors
*   "Do you have this in **blue**?"
*   "I need a **large** size, please."
*   "Can I try this on?"

### 4. At the Supermarket
*   **Where can I find the milk?**
*   **A kilo of tomatoes, please.**
*   **Do you need a bag?**
`,
  contentAr: `
### 1. في محل الملابس
*   قميص.
*   بنطال.
*   سترة.
*   حذاء.

### 2. السؤال عن السعر
استخدم "كم سعر هذا؟" للمفرد، و "كم سعر هؤلاء؟" للجمع.
*   رخيص.
*   غالٍ.

### 3. المقاسات والألوان
*   صغير، متوسط، كبير، كبير جداً.
*   الألوان: أحمر، أزرق، أخضر، أسود، أبيض.

### 4. عند الدفع
*   الكاشير يسألك: "كيف تود الدفع؟"
*   أجبه: "بالبطاقة من فضلك" أو "نقداً".

> **قاعدة ذهبية:** عند السؤال عن مكان شيء، ابدأ بكلمة "معذرة" لجذب انتباه البائع بلطف.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: much, size, try, expensive.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "How _______ is this jacket?", textAr: "بكم _______ هذه السترة؟" },
        { text: "Can I _______ this on in the fitting room?", textAr: "هل يمكنني _______ هذا في غرفة القياس؟" },
        { text: "Do you have a smaller _______?", textAr: "هل لديك _______ أصغر؟" }
      ]
    }
  ],
  quiz: [
    {
      question: "Where do you go to test if clothes fit you?",
      questionAr: "أين تذهب لتجربة ما إذا كانت الملابس تناسبك؟",
      options: ["The kitchen", "The fitting room", "The street", "The bank"],
      optionsAr: ["المطبخ", "غرفة القياس", "الشارع", "البنك"],
      correctIndex: 1,
      explanation: "A fitting room is a private space in a shop where you can put on clothes.",
      explanationAr: "غرفة القياس (fitting room) هي مساحة خاصة في المتجر حيث يمكنك تجربة الملابس."
    }
  ]
};
