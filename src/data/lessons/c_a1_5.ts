
import { Lesson, proficiencyLevel } from "../../types";

export const routinesA1: Partial<Lesson> = {
  title: "Daily Routines & Time",
  titleAr: "الروتين اليومي والوقت",
  proficiencyLevel: proficiencyLevel.A1,
  warmup: {
    mission: "Learn how to describe your typical day and tell the time in English.",
    missionAr: "تعلم كيفية وصف يومك المعتاد وإخبار الوقت باللغة الإنجليزية.",
    objectives: [
      "Use daily action verbs (wake up, go to work, etc.).",
      "Tell the time (o'clock, half past).",
      "Use 'At' for specific times.",
      "Ask 'What time do you...?'"
    ],
    objectivesAr: [
      "استخدام أفعال الأحداث اليومية (أستيقظ، أذهب للعمل، إلخ).",
      "إخبار الوقت (تماماً، ونصف).",
      "استخدام 'At' للأوقات المحددة.",
      "سؤال 'في أي وقت أنت...؟'"
    ]
  },
  content: `
### 1. Daily Verbs
*   **Wake up**
*   **Have breakfast**
*   **Go to work / school**
*   **Have lunch**
*   **Go home**
*   **Have dinner**
*   **Go to bed**

### 2. Telling Time
*   **What time is it?**
*   **It's 7 o'clock.**
*   **It's half past seven.**
*   **It's seven fifteen.**

### 3. Using "AT" for Time
We use **at** before a specific time:
*   "I wake up **at** 6:00."
*   "I have lunch **at** 1:30."

### 4. Simple Dialogue
*   **A:** What time do you wake up?
*   **B:** I usually wake up at 7:00.
*   **A:** When do you start work?
*   **B:** I start at 9:00 and finish at 5:00.
*   **A:** What do you do in the evening?
*   **B:** I watch TV and go to bed at 10:00.
`,
  contentAr: `
### 1. كيف تصف يومك؟
استخدم أفعالاً بسيطة لترتيب يومك:
*   أولاً...
*   ثم...
*   أخيراً...

### 2. الساعة بالإنجليزية
الطريقة الأسهل هي قول الساعات ثم الدقائق:
*   الثامنة وعشر دقائق.
*   العاشرة والنصف.

### 3. السؤال عن الروتين
*   في أي وقت...؟
*   متى...؟

### 4. فترات اليوم
*   في الصباح.
*   بعد الظهر.
*   في المساء.
*   ليلاً.

> **قاعدة ذهبية:** عند التحدث عن روتينك اليومي، استخدم الفعل في صورته البسيطة.
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Fill in the blanks with "at" or a daily verb.',
      instructionAr: 'املأ الفراغات بـ "at" أو فعل يومي.',
      items: [
        { text: "I have breakfast _______ 8:00 o'clock.", textAr: "أتناول الإفطار _______ الثامنة تماماً." },
        { text: "I _______ to bed at 11 PM.", textAr: "أنا _______ للنوم في الـ 11 مساءً." },
        { text: "What time do you _______ work?", textAr: "في أي وقت _______ عملك؟" }
      ]
    }
  ],
  quiz: [
    {
      question: "Which preposition is used with specific times (e.g., 9:00)?",
      questionAr: "أي حرف جر يستخدم مع الأوقات المحددة (مثلاً 9:00)؟",
      options: ["In", "On", "At", "By"],
      optionsAr: ["In", "On", "At", "By"],
      correctIndex: 2,
      explanation: "'At' is the correct preposition for specific clock times.",
      explanationAr: "حرف الجر 'At' هو الصحيح للاستخدام مع ساعات الوقت المحددة."
    }
  ]
};
