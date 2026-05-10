
import { Lesson, proficiencyLevel } from "../../types";

export const dealingProblemsB2: Partial<Lesson> = {
  title: "Dealing with Problems & Complaints",
  titleAr: "التعامل مع المشاكل والشكاوى",
  proficiencyLevel: proficiencyLevel.B2,
  warmup: {
    mission: "Learn how to make effective complaints, handle difficult situations, and negotiate solutions in a professional manner.",
    missionAr: "تعلم كيفية تقديم شكاوى فعالة، والتعامل مع المواقف الصعبة، والتفاوض على الحلول بطريقة احترافية.",
    objectives: [
      "Use 'I'm afraid I have a complaint about...' for soft starts.",
      "Explain the problem clearly (Defective, undercooked, delayed).",
      "Negotiate a resolution (Full refund, exchange, credit).",
      "Escalate the problem respectfully."
    ],
    objectivesAr: [
      "استخدام 'أخشى أن لدي شكوى بخصوص...' للبدء بلطف.",
      "شرح المشكلة بوضوح (معيوب، غير ناضج، متأخر).",
      "التفاوض على حل (استرداد، استبدال، رصيد).",
      "تصعيد المشكلة باحترام."
    ]
  },
  content: `
### 1. Making a Complaint (تقديم شكوى)
Be polite but firm. Use a "soft start":
*   "**I'm afraid I have a complaint.** The service was quite slow tonight."
*   "**I'm calling to complain about** the product I received yesterday."
*   "**There seems to be an issue with** my booking."

### 2. Describing the Issue
*   **It's defective / faulty.** (بها عيب مصنعي).
*   **The item doesn't match the description.**
*   **I've been waiting for over an hour.**
*   **The staff was quite unhelpful.**

### 3. Requesting a Solution (طلب حل)
*   **"What can you do to fix this?"**
*   **"I'd like a full refund, please."** (أود استرداد المبلغ كاملاً).
*   **"Could you exchange this for a new one?"** (هل يمكنك استبداله بجهاز جديد؟).
*   **"I expect some form of compensation."** (أتوقع شكلاً من أشكال التعويض).

### 4. Handling a Complaint (as a Provider)
*   **"I'm terribly sorry for the inconvenience."** (أنا آسف جداً لهذا الإزعاج).
*   **"Let me look into that for you immediately."**
*   **"We will make sure this doesn't happen again."**
`,
  contentAr: `
### 1. فن الشكوى في الغرب
الشكوى لا تعني الصراخ. العميل "المحترف" هو من يصف المشكلة بهدوء ليحصل على حقه:
*   **"I'm not entirely satisfied with..."** (لست راضياً تماماً عن...).

### 2. مصطلحات المشاكل
*   **Inconvenience:** إزعاج / ضيق.
*   **Misunderstanding:** سوء تفاهم.
*   **Substandard:** أقل من المستوى المطلوب.

### 3. تصعيد المشكلة
إذا لم يساعدك الموظف:
*   **"Could I speak to the manager, please?"** (هل يمكنني التحدث للمدير؟).

### 4. الوصول لتسوية
*   **A voucher:** قسيمة شراء.
*   **A discount:** خصم.
*   **Free delivery:** توصيل مجاني.

> **نصيحة:** التوثيق مهم. قل دائماً: **"Could you send me an email confirming what we discussed?"**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the complaint dialogue with: refund, issue, inconvenience, manager.',
      instructionAr: 'أكمل حوار الشكوى بالكلمات المناسبة.',
      items: [
        { text: "A: There seems to be an _______ with my laptop. It won't start.", textAr: "أ: يبدو أن هناك _______ في حاسوبي المحمول." },
        { text: "B: I'm sorry for the _______. Let me check it.", textAr: "ب: أنا آسف لـ _______." },
        { text: "A: If you can't fix it, I'd like a full _______.", textAr: "أ: إذا لم تستطع إصلاحه، أود _______ كاملاً." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is a 'Refund'?",
      questionAr: "ما هو الـ 'Refund'؟",
      options: ["Giving more money", "Getting your money back", "Exchanging an item", "A type of tax"],
      optionsAr: ["إعطاء مزيد من المال", "استعادة أموالك", "استبدال قطعة", "نوع من الضرائب"],
      correctIndex: 1,
      explanation: "A refund is the return of money to a customer who is not satisfied with a product or service.",
      explanationAr: "الـ Refund هو إعادة المال للزبون غير الراضي عن المنتج أو الخدمة."
    }
  ]
};
