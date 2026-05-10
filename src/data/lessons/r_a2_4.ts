
import { Lesson, proficiencyLevel } from "../../types";

export const tradeTransactionsA2: Partial<Lesson> = {
  title: "Trade and Transactions",
  titleAr: "التجارة والمعاملات",
  proficiencyLevel: proficiencyLevel.A2,
  warmup: {
    mission: "Learn the specific vocabulary and formats used in shopping, receipts, and basic commerce.",
    missionAr: "تعلم المفردات والصيغ الخاصة المستخدمة في التسوق، الإيصالات، والتجارة الأساسية.",
    objectives: [
      "Understand columns on a business receipt (Qty, Item, Total).",
      "Identify the difference between 'Net' and 'Gross' prices.",
      "Recognize terms for returns and refunds."
    ],
    objectivesAr: [
      "فهم الأعمدة في إيصال العمل (الكمية، الصنف، المجموع).",
      "تمييز الفرق بين السعر الصافي (Net) والإجمالي (Gross).",
      "التعرف على مصطلحات الاسترجاع والاسترداد."
    ]
  },
  content: `
### 1. Reading a Receipt (قراءة الإيصال)
A typical transaction document has headers you must know:

*   **QTY (Quantity)**: How many items (الكمية).
*   **Unit Price**: Cost for one item (سعر الوحدة).
*   **Subtotal**: Price before tax (المجموع الفرعي).
*   **VAT / Tax**: Government fees (الضريبة).
*   **Total / Grand Total**: Final amount to pay (المجموع الكلي).

### 2. Shipping and Delivery Terms (مصطلحات الشحن)
When shopping online, look for:
*   **Standard Shipping**: 3-5 days (شحن عادي).
*   **Express Shipping**: Next day (شحن سريع).
*   **Tracking Number**: To follow your package (رقم التتبع).

> **Formula/Rule:**
> **Quantity x Unit Price = Subtotal**
> *2 [Qty] x $5 [Price] = $10 [Subtotal]*

### 3. Refunds and Exchanges (الاسترجاع والتبديل)
Important phrases in "Terms and Conditions":
*   "No returns after 14 days."
*   "Original receipt required."
*   "Full **Refund**." (استرداد كامل للمال)
`,
  contentAr: `
### 1. قراءة الإيصالات (Reading a Receipt)
يحتوي مستند المعاملة المالية على رؤوس أعمدة هامة:

*   **QTY:** اختصار لـ Quantity وتعني الكمية.
*   **Amount:** تعني القيمة أو المبلغ.
*   **Change:** تعني "الفكة" أو المبلغ المتبقي المسترد بعد الدفع.

### 2. مصطلحات المعاملات التجارية (Trade Vocabulary)
*   **Total:** هو المبلغ النهائي الذي يجب عليك دفعه.
*   **Refund:** هو استرداد مالك إذا لم يعجبك المنتج.
*   **Cashier:** هو الشخص المسؤول عن استلام المال.

> **قاعدة مالية:** دائماً تأكد من كلمة **Total** في نهاية القائمة لتعرف التزامك المالي النهائي.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete with: Total, Tax, Quantity.',
      instructionAr: 'أكمل الفراغات بالمططلحات التجارية.',
      items: [
        { text: "I bought 3 pens. The _______ is 3.", textAr: "اشتريت 3 أقلام. الـ _______ هي 3." },
        { text: "The price is $10 + $1 _______. I pay $11.", textAr: "السعر 10 دولارات + 1 دولار _______. أدفع 11 دولاراً." },
        { text: "The final _______ is $50.", textAr: "الـ _______ النهائي هو 50 دولاراً." }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'QTY' stand for?",
      questionAr: "إلى ماذا يرمز اختصار 'QTY'؟",
      options: ["Quality", "Quickly", "Quantity", "Quest"],
      optionsAr: ["الجودة", "بسرعة", "الكمية", "المهمة"],
      correctIndex: 2,
      explanation: "QTY is the standard short form for Quantity.",
      explanationAr: "هو الاختصار العالمي لكلمة الكمية."
    },
    {
      question: "If you want your money back, you ask for a:",
      questionAr: "إذا كنت تريد استعادة أموالك، فإنك تطلب:",
      options: ["Receipt", "Refund", "Report", "Review"],
      optionsAr: ["إيصال", "استرداد (Refund)", "تقرير", "مراجعة"],
      correctIndex: 1,
      explanation: "A refund is the return of money for a product.",
      explanationAr: "الـ Refund هو عملية استرجاع المال مقابل البضاعة."
    }
  ]
};
