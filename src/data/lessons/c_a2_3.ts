
import { Lesson, proficiencyLevel } from "../../types";

export const travelA2: Partial<Lesson> = {
  title: "Travel & Transportation",
  titleAr: "السفر ووسائل النقل",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn how to navigate an airport, buy tickets, and ask for directions in a new city.",
    missionAr: "تعلم كيفية التنقل في المطار، شراء التذاكر، والسؤال عن الاتجاهات في مدينة جديدة.",
    objectives: [
      "Understand airport vocabulary (gate, boarding pass, luggage).",
      "Buy a train or bus ticket.",
      "Ask for and give simple directions (turn left, go straight).",
      "Talk about your past holidays."
    ],
    objectivesAr: [
      "فهم مصطلحات المطار (البوابة، بطاقة الصعود، الأمتعة).",
      "شراء تذكرة قطار أو حافلة.",
      "طلب وإعطاء اتجاهات بسيطة (اتجه يساراً، اذهب للأمام).",
      "التحدث عن عطلاتك السابقة."
    ]
  },
  content: `
### 1. At the Airport
*   **Check-in desk**
*   **Boarding pass**
*   **Gate**
*   **Departure / Arrival**
*   **Carry-on bag**
*   **Suitcase**

### 2. Buying Tickets
*   **"A single ticket to London, please."**
*   **"A return ticket, please."**
*   **"Which platform does the train leave from?"**

### 3. Asking for Directions
*   **Go straight on.**
*   **Turn left / Turn right.**
*   **Take the first left.**
*   **It's opposite the bank.**
*   **It's next to the park.**

### 4. Past Holidays
"Last summer, I **went** to Turkey. I **stayed** in a beautiful hotel and **visited** many museums."
`,
  contentAr: `
### 1. كلمات أساسية للمسافر
*   رحلة طيران.
*   راكب.
*   جواز سفر.
*   تأخير.

### 2. في محطة القطار أو الحافلة
*   ذهاب فقط.
*   ذهاب وعودة.
*   "هل هذا المقعد شاغر؟"

### 3. كيف تسأل عن الطريق؟
ابدأ دائماً بعبارة: "عذراً، كيف يمكنني الوصول إلى...؟"
*   اعبر الشارع.
*   مر من أمام السينما.

### 4. حجز الفندق
*   تسجيل الدخول.
*   "هل الإفطار مشمول؟"

> **نصيحة:** عند السؤال عن الاتجاهات، كرر ما قاله لك الشخص لتتأكد من فهمك الصحيح للمسار.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the sentences with: platform, gate, return, directions.',
      instructionAr: 'أكمل الجمل بالكلمة المناسبة.',
      items: [
        { text: "Your flight is leaving from _______ number 5.", textAr: "رحلتك ستغادر من _______ رقم 5." },
        { text: "Can you give me _______ to the hospital?", textAr: "هل يمكنك إعطائي _______ للمستشفى؟" },
        { text: "I'd like a _______ ticket to Paris, please.", textAr: "أود تذكرة _______ لباريس، من فضلك." }
      ]
    }
  ],
  quiz: [
    {
      question: "What do you call a ticket for GOING and COMING BACK?",
      questionAr: "ماذا تسمى التذكرة للذهاب والعودة؟",
      options: ["Single ticket", "Return ticket", "Entry ticket", "Lost ticket"],
      optionsAr: ["تذكرة ذهاب فقط", "تذكرة عودة", "تذكرة دخول", "تذكرة مفقودة"],
      correctIndex: 1,
      explanation: "A return (UK) or round-trip (US) ticket covers both journeys.",
      explanationAr: "تذكرة العودة (Return في بريطانيا أو Round-trip في أمريكا) تغطي كلتا الرحلتين."
    }
  ]
};
