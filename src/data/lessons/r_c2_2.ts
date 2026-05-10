
import { Lesson, proficiencyLevel } from "../../types";

export const linguisticNuanceC2: Partial<Lesson> = {
  title: "Linguistic Nuance & Ambiguity",
  titleAr: "الفروق اللغوية الدقيقة والغموض",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Attain the highest level of reading sensitivity to detect subtle sarcasm, double meanings, and deliberate ambiguity in high literature and high-stakes negotiation.",
    missionAr: "الوصول إلى أعلى مستويات الحساسية في القراءة للكشف عن السخرية الخفية، والمعاني المزدوجة، والغموض المتعمد في الأدب الرفيع والمفاوضات عالية المستوى.",
    objectives: [
      "Distinguish between 'Synonyms' that carry different social weights.",
      "Identify 'Double Entendre' (phrases with two interpretations).",
      "Evaluate the use of 'Vagueness' as a strategic tool in diplomacy."
    ],
    objectivesAr: [
      "التمييز بين 'المترادفات' التي تحمل أوزاناً اجتماعية مختلفة.",
      "تحديد 'المعنى المزدوج' (عبارات لها تفسيران).",
      "تقييم استخدام 'الغموض' كأداة استراتيجية في الدبلوماسية."
    ]
  },
  content: `
### 1. The Illusion of Synonymy (وهم الترادف)
In C2 reading, no two words are truly identical. The choice of one over another is a "Nuance".
*   **Economical vs. Cheap:** Both mean low cost, but "economical" is praise (smart), while "cheap" is an insult (poor quality).
*   **Confident vs. Arrogant:** Both mean self-belief, but "arrogant" implies an offensive superiority.

### 2. Strategic Ambiguity (الغموض الاستراتيجي)
Authors sometimes write vaguely **on purpose**. 
*   **In Diplomacy:** "We will take all necessary measures." (What measures? When?)
*   **In Literature:** Ending a story without revealing the hero's fate to force reader reflection.

### 3. Double Entendre and Puns (الموريات والتورية)
Advanced texts often use language that functions on two levels simultaneously.
*   Level 1: The literal meaning.
*   Level 2: The sarcastic or hidden social critique.

| Pair | Nuance Difference | Arabic Distinction |
| :--- | :--- | :--- |
| **Famous / Notorious** | Positivity vs. Negativity. | مشهور / سيء السمعة |
| **Request / Demand** | Polite ask vs. Powerful order. | يطلب / يفرض (يطالب) |
| **Childlike / Childish** | Innocent vs. Immature. | طفولي (براءه) / صبياني (نقص نضج) |
`,
  contentAr: `
### 1. وهم الترادف (Illusion of Synonymy)
في مستوى C2، لا توجد كلمتان متطابقتان تماماً. اختيار كلمة دون أخرى هو "فارق دقيق".
*   **Economical vs. Cheap:** كلاهما يعني تكلفة منخفضة، لكن الأولى مدح والثانية ذم.
*   **Childlike vs. Childish:** الأولى تصف نقاء الأطفال (براءة)، والثانية تصف نقص النضج (سخافة).

### 2. الغموض الاستراتيجي (Strategic Ambiguity)
يكتب الكتاب أحياناً بغموض **عن قصد**.
*   **في الدبلوماسية:** "سنتخذ كافة الإجراءات اللازمة" (ما هي؟ متى؟). هذا يترك مساحة للمناورة.

### 3. المعاني المزدوجة (Double Entendre)
النصوص المتقدمة تعمل على مستويين:
*   المستوى 1: المعنى الحرفي.
*   المستوى 2: النقد الساخر الخفي.

> **نصيحة للخبير:** عندما تقرأ نصاً لكاتب عظيم، اسأل نفسك دائماً: "لماذا اختار هذه الكلمة تحديداً ولم يختر مرادفتها الشائعة؟"
`,
  exercises: [
    {
      type: 'multiple',
      instruction: 'Select the word with the POSITIVE nuance.',
      instructionAr: 'اختر الكلمة ذات الظلال الإيجابية.',
      items: [
        { 
          text: "The leader was _______ in his decision making.", 
          textAr: "كان القائد _______ في اتخاذ قراراته.",
          options: ["Stubborn", "Determined", "Obstinate"],
          optionsAr: ["عنيد (سلبي)", "مصمم (إيجابي)", "متمسك برأيه (بجمود)"],
          answer: "Determined"
        }
      ]
    }
  ],
  quiz: [
    {
      question: "What is 'Strategic Ambiguity' primarily used for in formal writing?",
      questionAr: "في ماذا يُستخدم 'الغموض الاستراتيجي' بشكل أساسي في الكتابة الرسمية؟",
      options: ["To save time", "To avoid making a definite commitment", "To show off vocabulary", "Because the author is confused"],
      optionsAr: ["لتوفير الوقت", "لتجنب الالتزام القاطع", "للاستعراض اللغوي", "لأن الكاتب مرتبك"],
      correctIndex: 1,
      explanation: "Strategic ambiguity allows for flexibility and multiple interpretations, common in legal and diplomatic texts.",
      explanationAr: "يسمح الغموض الاستراتيجي بالمرونة وتعدد التفسيرات، وهو شائع في النصوص القانونية والدبلوماسية."
    }
  ]
};
