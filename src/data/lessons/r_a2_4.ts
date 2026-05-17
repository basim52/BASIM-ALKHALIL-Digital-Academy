
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
### 1. Reading a Receipt
A typical transaction document has headers you must know:

*   **QTY (Quantity)**: How many items.
*   **Unit Price**: Cost for one item.
*   **Subtotal**: Price before tax.
*   **VAT / Tax**: Government fees.
*   **Total / Grand Total**: Final amount to pay.

### 2. Shipping and Delivery Terms
When shopping online, look for:
*   **Standard Shipping**: 3-5 days.
*   **Express Shipping**: Next day.
*   **Tracking Number**: To follow your package.

### 3. Refunds and Exchanges
Important phrases in "Terms and Conditions":
*   "No returns after 14 days."
*   "Original receipt required."
*   "Full **Refund**."
`,
  contentAr: `
### 1. قراءة الإيصالات
يحتوي مستند المعاملة المالية على رؤوس أعمدة هامة يجب معرفتها:

*   **الكمية:** اختصار يرمز لعدد القطع المشتراة.
*   **المبلغ:** تعني القيمة الإجمالية لكل صنف.
*   **الباقي:** تعني المبلغ المتبقي المسترد لك بعد عملية الدفع النقدي.

### 2. مصطلحات المعاملات التجارية
*   **الإجمالي:** هو المبلغ النهائي الذي يجب عليك دفعه بعد إضافة الضرائب.
*   **الاسترداد:** هو استرجاع مالك في حال قمت بإرجاع المنتج.
*   **المحاسب:** هو الشخص المسؤول عن استلام المال وإتمام المعاملة.

> **قاعدة مالية:** دائماً تأكد من خانة الإجمالي في نهاية القائمة لتعرف التزامك المالي النهائي بدقة.
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
  readingText: {
    paragraphs: [
      {
        en: 'Understanding a business **receipt** is a key skill for daily life. Always check the **quantity** (QTY) to ensure you received the correct number of items. The **grand total** shows the final amount you must pay including tax.',
        ar: 'فهم **إيصال** العمل مهارة أساسية في الحياة اليومية. تحقق دائماً من **الكمية** (QTY) للتأكد من استلامك للعدد الصحيح من الأصناف. يظهر **المجموع الإجمالي** المبلغ النهائي الذي يجب عليك دفعه شاملاً الضريبة.'
      },
      {
        en: 'If you are not satisfied with a product, you can often request a **refund**. Make sure to read the commerce policy carefully, as most shops require the original document within a specific time limit for any return.',
        ar: 'إذا لم تكن راضياً عن منتج ما، يمكنك غالباً طلب **استرداد أموال** (refund). تأكد من قراءة سياسة التجارة بعناية، حيث تطلب معظم المتاجر المستند الأصلي خلال حد زمني معين لأي عملية إرجاع.'
      }
    ]
  },
  vocabulary: [
    {
      word: 'Receipt',
      phonetic: 'rɪˈsiːt',
      meaningAr: 'إيصال / فاتورة',
      example: 'Please keep your receipt for the warranty.'
    },
    {
      word: 'Quantity',
      phonetic: 'ˈkwɒntəti',
      meaningAr: 'كمية / عدد',
      example: 'The quantity of items was incorrect on the bill.'
    },
    {
      word: 'Refund',
      phonetic: 'ˈriːfʌnd',
      meaningAr: 'استرداد (مالي)',
      example: 'I asked for a full refund because the box was empty.'
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
