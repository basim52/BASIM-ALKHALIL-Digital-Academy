
import { Lesson, proficiencyLevel } from "../../types";

export const reportAuditsB2: Partial<Lesson> = {
  title: "Informational Report Audits",
  titleAr: "تدقيق التقارير المعلوماتية",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn to audit professional reports by cross-referencing text with statistical data, charts, and appendices.",
    missionAr: "تعلم تدقيق التقارير المهنية من خلال مقارنة النص بالبيانات الإحصائية والرسوم البيانية والملاحق.",
    objectives: [
      "Interpret complex data trends in line graphs and pie charts.",
      "Identify discrepancies between a report summary and its data tables.",
      "Understand technical abbreviations in financial or scientific audits."
    ],
    objectivesAr: [
      "تفسير اتجاهات البيانات المعقدة في الرسوم البيانية.",
      "تحديد التعارضات بين ملخص التقرير وجداول البيانات الخاصة به.",
      "فهم الاختصارات التقنية في التدقيقات المالية أو العلمية."
    ]
  },
  content: `
### 1. Data Visualization in Reading (تمثيل البيانات)
At B2, reading is not just words—it's numbers and visual logic.

*   **Trends (الاتجاهات):** Look for verbs like *skyrocketed*, *plummeted*, *stabilized*, and *fluctuated*.
*   **Proportions (النسب):** Terms like *a vast majority*, *a negligible fraction*, and *the lion's share*.

### 2. Auditing for Accuracy (التدقيق من أجل الدقة)
When reading a report, always cross-check:
1.  **The Executive Summary:** Does it reflect the real numbers?
2.  **The Methodology:** How did they get the data?
3.  **The Conclusion:** Is it supported by the evidence?

### 3. Professional Vocabulary (مفردات مهنية)
| Term | Context | Arabic |
| :--- | :--- | :--- |
| **Audit** | Official inspection of records. | تدقيق |
| **Variance** | The difference between expectation and reality. | تباين |
| **KPI** | Key Performance Indicator. | مؤشر أداء رئيسي |
| **Quarterly** | Every three months. | ربع سنوي |

> **Formula/Rule:**
> **Claim + Source + Data Point**
> *Profit rose [Claim] according to Figure 2 [Source] which shows a 4% growth [Data].*
`,
  contentAr: `
### 1. تفسير البيانات (Data Interpretation)
في المستوى B2، لا تقتصر القراءة على الكلمات، بل تشمل الأرقام والمنطق البصري.

*   **الاتجاهات:** ابحث عن أفعال مثل *skyrocketed* (ارتفع بشدة) و *plummeted* (نهار/انخفض بشدة).
*   **النسب:** مصطلحات مثل *majority* (أغلبية) و *fraction* (جزء ضئيل جداً).

### 2. مهارات التدقيق (Audit Skills)
عند قراءة تقرير، تحقق دائماً من:
1.  **الملخص التنفيذي:** هل يعكس الأرقام الحقيقية؟
2.  **المنهجية:** كيف تم الحصول على البيانات؟

### 3. مفردات تقنية (Vocabulary)
*   **Variance:** الفرق بين ما كان متوقعاً وما حدث فعلاً.
*   **Quarterly:** تقرير يصدر كل 3 أشهر.

> **نصيحة للقراءة:** الرسوم البيانية لا تكذب، لكن الملخصات أحياناً تبالغ. دائماً عد للأرقام الخام.
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Interpret the trend.',
      instructionAr: 'فسر الاتجاه أو الحركة.',
      items: [
        { 
          text: "Sales went from 100 to 5,000 in one month. They _______.", 
          textAr: "انتقلت المبيعات من 100 إلى 5000 في شهر واحد. لقد _______.",
          options: ["Stabilized", "Skyrocketed", "Fluctuated"],
          optionsAr: ["استقرت", "ارتفعت بشكل صاروخي", "تذبذبت"],
          answer: "Skyrocketed"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "What is an 'Audit'?",
      questionAr: "ما هو الـ 'Audit'؟",
      options: ["A friendly chat", "A formal inspection of records", "A type of marketing", "A deleted file"],
      optionsAr: ["دردشة ودية", "فحص رسمي للسجلات", "نوع من التسويق", "ملف محذوف"],
      correctIndex: 1,
      explanation: "An audit is a systematic examination of financial or operational records.",
      explanationAr: "التدقيق هو فحص منظم للسجلات المالية أو التشغيلية."
    }
  ]
};
