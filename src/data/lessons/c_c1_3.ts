
import { Lesson, proficiencyLevel } from "../../types";

export const professionalPresentationsC1: Partial<Lesson> = {
  title: "Professional Presentations",
  titleAr: "العروض التقديمية المهنية",
  proficiencyLevel: proficiencyLevel.C1,
  warmup: {
    mission: "Master the art of delivering complex information through professional presentations, focusing on structure, visual aids, and Q&A management.",
    missionAr: "إتقان فن تقديم المعلومات المعقدة من خلال العروض التقديمية المهنية، مع التركيز على الهيكل، الوسائل البصرية، وإدارة الأسئلة والأجوبة.",
    objectives: [
      "Structure a presentation using the 'What-How-Why' model.",
      "Describe trends and data with sophisticated verbs (Plummet, Soar, Fluctuate).",
      "Manage interruptions and difficult questions.",
      "Use transition signals to guide the audience."
    ],
    objectivesAr: [
      "هيكلة العرض التقديمي باستخدام نموذج 'ماذا-كيف-لماذا'.",
      "وصف الاتجاهات والبيانات بأفعال متطورة (يهوي، يرتفع بشدة، يتذبذب).",
      "إدارة المقاطعات والأسئلة الصعبة.",
      "استخدام إشارات الانتقال لتوجيه الجمهور."
    ]
  },
  content: `
### 1. The Opening Hook
Don't start with "My name is... and today I will...". Try:
*   **A shocking statistic:** "Did you know that half of all startups fail in the first year?"
*   **A thought-provoking question:** "What would you do if you had unlimited resources?"
*   **A brief anecdote:** "Let me tell you about a client I met last month."

### 2. Describing Data & Trends (البيانات)
Avoid "Go up" or "Go down":
*   **To soar / To skyrocket:** (High increase).
*   **To plummet / To dive:** (Sharp decrease).
*   **To fluctuate:** (Change frequently).
*   **To plateau:** (Stay the same after a period of change).

### 3. Transitioning Smootly (إشارات الانتقال)
*   **"Turning now to the issue of..."** (بالانتقال الآن لمسألة...).
*   **"Let's move on to the next slide, which illustrates..."**
*   **"Conversely, ..."** / **"Expanding on that, ..."**

### 4. Handling Q&A (الأسئلة والأجوبة)
*   **Buying time:** "That's an excellent question. Let me think about that for a second."
*   **Clarification:** "Just to be clear, are you asking about...?"
*   **Deflecting:** "I don't have the exact figures with me, but I can send them later."
`,
  contentAr: `
### 1. هيكل العرض الاحترافي
*   **Introduction:** جذب الانتباه وذكر الهدف.
*   **Body:** تقسيم النقاط (قاعدة الثلاثة).
*   **Conclusion:** تلخيص قوي ودعوة للعمل (**Call to Action**).

### 2. لغة البيانات المتقدمة
*   **Significant increase:** زيادة كبيرة.
*   **Marginal improvemnet:** تحسن طفيف.
*   **Exponential growth:** نمو هائل (متضاعف).

### 3. التواصل البصري ولغة الجسد
*   **Stance:** الوقوف بثبات.
*   **Gesture:** استخدام اليدين لتوضيح الحجم أو الاتجاه.
*   **Visual Aids:** لا تقرأ من الشرائح (Slides). العرض للتوضيح وليس للقراءة.

### 4. التعامل مع الجمهور الصعب
*   **"I appreciate your input, but for the sake of time, let's discuss this later."** (أقدر مداخلتك، ولكن حرصاً على الوقت، لنناقش هذا لاحقاً).

> **نصيحة:** تدرب على "نغمة الصوت" (**Intonation**). الكلمات المهمة يجب أن تُنطق بوضوح وبطء أكبر.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Match the data verb to its meaning: Soar, Plummet, Fluctuate.',
      instructionAr: 'طابق فعل البيانات بمعناه.',
      items: [
        { text: "To decrease very quickly and sharply. -> _______.", textAr: "الانخفاض بسرعة وبحدة شديدة. -> _______." },
        { text: "To increase very quickly and sharply. -> _______.", textAr: "الارتفاع بسرعة وبحدة شديدة. -> _______." },
        { text: "To change up and down continually. -> _______.", textAr: "التغير صعوداً وهبوطاً باستمرار. -> _______." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the primary purpose of a 'Handout' or 'Visual Aid'?",
      questionAr: "ما هو الغرض الأساسي من 'المنشورات' أو 'الوسائل البصرية'؟",
      options: ["To show how many slides you can make", "To support and clarify your spoken words", "To replace your speech entirely", "To distract the audience"],
      optionsAr: ["لإظهار كم عدد الشرائح التي يمكنك صنعها", "لدعم وتوضيح كلماتك المنطوقة", "لاستبدال حديثك بالكامل", "لتشتيت الجمهور"],
      correctIndex: 1,
      explanation: "Visual aids should supplement the presenter's message, not dominate or replace it.",
      explanationAr: "يجب أن تكون الوسائل البصرية مكملة لرسالة العارض، لا أن تسيطر عليها أو تستبدلها."
    }
  ]
};
