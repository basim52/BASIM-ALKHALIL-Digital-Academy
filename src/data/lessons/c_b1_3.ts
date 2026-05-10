
import { Lesson, proficiencyLevel } from "../../types";

export const jobInterviewsB1: Partial<Lesson> = {
  title: "Job Interviews: Basics",
  titleAr: "مقابلات العمل: الأساسيات",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to answer common interview questions, describe your skills, and present yourself professionally.",
    missionAr: "تعلم كيفية الإجابة على أسئلة المقابلة الشائعة، وصف مهاراتك، وتقديم نفسك بشكل احترافي.",
    objectives: [
      "Answer 'Tell me about yourself'.",
      "Describe strengths and weaknesses.",
      "Explain why you want the job.",
      "Ask professional questions at the end."
    ],
    objectivesAr: [
      "الإجابة على 'حدثني عن نفسك'.",
      "وصف نقاط القوة والضعف.",
      "شرح لماذا تريد الوظيفة.",
      "طرح أسئلة مهنية في النهاية."
    ]
  },
  content: `
### 1. Breaking the Ice
*   **Interviewer:** "Tell me about yourself."
*   **Response:** Focus on your education and work experience. "I have a degree in... and I have worked as a... for two years."

### 2. Strengths and Weaknesses (نقاط القوة والضعف)
*   **Strengths:** "I am highly organized," "I am a team player," "I have good communication skills."
*   **Weaknesses:** Always choose a "positive" weakness. "I sometimes focus too much on details, but I am learning to manage my time better."

### 3. Why this Job?
Do not just say "for money". Say:
*   "I want to grow my career."
*   "Your company has a great reputation."
*   "I think my skills match this role perfectly."

### 4. Common Questions
*   "What are your long-term goals?"
*   "How do you handle stress?"
*   "Why should we hire you?"

### 5. Final Questions (Asking the Interviewer)
*   "What is a typical day like in this role?"
*   "What are the possibilities for training?"
`,
  contentAr: `
### 1. كيف تجيب على "Tell me about yourself"؟
لا تتحدث عن حياتك الشخصية. ركز على:
1.  دراستك (**Education**).
2.  خبرتك (**Experience**).
3.  مهاراتك (**Skills**).

### 2. نقاط القوة والضعف
*   **Strong point:** "I'm a fast learner." (أنا أتعلم بسرعة).
*   **Weak point:** "I'm a perfectionist." (أهتم بالكمال الزائد - نقطة ضعف تبدو كمدح).

### 3. كلمات مهنية ستحتاج إليها
*   **Responsible for:** مسؤول عن.
*   **Flexible:** مرن.
*   **Cooperative:** متعاون.
*   **Reliable:** موثوق.

### 4. ختام المقابلة
عندما يسألك "Do you have any questions for us?"، **لا تقل "لا"**. اسأل عن طبيعة العمل أو الفريق.

> **نصيحة:** استخدم الفعل الماضي البسيط للحديث عن إنجازاتك السابقة: **"I solved a major problem..."** أو **"I managed a team of..."**
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Complete the interview answers with: degree, strengths, goals, organized.',
      instructionAr: 'أكمل إجابات المقابلة بالكلمات المناسبة.',
      items: [
        { text: "I have a _______ in Computer Science from Cairo University.", textAr: "لدي _______ في علوم الحاسب من جامعة القاهرة." },
        { text: "One of my greatest _______ is that I am very _______.", textAr: "أحد أكبر _______ هي أنني _______ جداً." },
        { text: "In five years, my _______ are to become a manager.", textAr: "في غضون خمس سنوات، _______ هي أن أصبح مديراً." }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the best way to choose a 'weakness' for an interview?",
      questionAr: "ما هي أفضل طريقة لاختيار 'نقطة ضعف' للمقابلة؟",
      options: ["Tell them you have no weaknesses.", "Tell a negative weakness like being lazy.", "Tell a weakness you are working to improve.", "Tell a funny joke."],
      optionsAr: ["قل لهم ليس لديك نقاط ضعف.", "قل نقطة سلبية كأنك كسول.", "قل نقطة ضعف تعمل على تحسينها.", "قل نكتة مضحكة."],
      correctIndex: 2,
      explanation: "Interviewers look for self-awareness and a proactive attitude towards self-improvement.",
      explanationAr: "يبحث المحاورون عن الوعي بالذات والموقف الاستباقي تجاه تحسين النفس."
    }
  ]
};
