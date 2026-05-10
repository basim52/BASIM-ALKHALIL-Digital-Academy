
import { Lesson, proficiencyLevel } from "../../types";

export const etymologicalExcavationC2: Partial<Lesson> = {
  title: "Etymological Excavation",
  titleAr: "تحليل الجذور اللغوية العميقة",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Develop a master-level understanding of English word origins to decode complex vocabulary across science, law, and literature.",
    missionAr: "تطوير فهم بمستوى الخبراء لأصول الكلمات الإنجليزية لفك رموز المفردات المعقدة في العلوم والقانون والأدب.",
    objectives: [
      "Analyze Latin and Greek roots in high-level academic texts.",
      "Identify 'Semantic Shift' (how words change meaning over centuries).",
      "Decode obscure legal and medical terminology through etymology."
    ],
    objectivesAr: [
      "تحليل الجذور اللاتينية واليونانية في النصوص الأكاديمية رفيعة المستوى.",
      "تحديد 'التحول الدلالي' (كيف يتغير معنى الكلمات عبر القرون).",
      "فك رموز المصطلحات القانونية والطبية الغامضة من خلال علم الاشتقاق."
    ]
  },
  content: `
### 1. The Greco-Latin Foundation (الأساس اليوناني-اللاتيني)
At the C2 level, English is essentially a "Lego" language of Latin and Greek roots. Mastering these allows for the "Excavation" of meaning without a dictionary.

*   **Prefixes of Scale:** *Ultra-* (beyond), *Infra-* (below), *Supra-* (above).
    *   *Example:* Infrastructure (the underlying structure).
*   **Roots of Power:** *-cracy* (rule), *-arch* (leader).
    *   *Example:* Oligarchy (rule by a few).

### 2. Semantic Shift (التحول الدلالي)
Words are living things; they "shift" over time.
*   **Melancholy:** Originally meant "Black Bile" (medical term); now means "deep sadness".
*   **Villain:** Originally meant "farmhand" (social status); now means "evil person".

### 3. Digging into "Hard" Terminology (التنقيب في المصطلحات الصعبة)
When encountering a word like **"Anachronism"**:
1.  **Ana-** (Back/Against)
2.  **Chron-** (Time)
3.  **-ism** (State/Practice)
*Result:* Something that is in the wrong time.

| Root | Meaning | Example |
| :--- | :--- | :--- |
| **Cogn-** | Know | Cognitive / Incognito |
| **Voc-** | Call / Voice | Evocative / Equivocate |
| **Spec-** | Look / See | Introspection / Circumspect |
| **Path-** | Feeling | Antipathy / Empathy |
`,
  contentAr: `
### 1. الأساس اليوناني واللاتيني
في مستوى C2، تصبح اللغة الإنجليزية أشبه بلعبة "ليغو" من الجذور اللاتينية واليونانية. إتقان هذه الجذور يمنحك قدرة "التنقيب" عن المعنى دون قاموس.

*   **جذور السيطرة:** *-cracy* (حكم)، *-arch* (زعيم).
*   **جذور الرؤية:** *Spec- (نظر/رأى)* ومنها تأتي كلمة *Circumspect* (حذر/ينظر حوله).

### 2. التحول الدلالي (Semantic Shift)
الكلمات كائنات حية تتغير مع الزمن.
*   **Melancholy:** كانت قديماً مصطلحاً طبياً يعني "الصفراء السوداء"، والآن تعني حزناً عميقاً.

### 3. تفكيك المصطلحات
خذ كلمة **"Anachronism"**:
1.  **Ana:** تعني (ضد/خارج).
2.  **Chron:** تعني (الزمن).
*النتيجة:* شيء خارج سياقه الزمني.

> **نصيحة للخبير:** لا تحفظ الكلمات ككتل صلبة، بل فككها إلى ذراتها الاشتقاقية (الأصل، البادئة، اللاحقة).
`,
  exercises: [
    {
      type: 'match',
      instruction: 'Match the root to its semantic domain.',
      instructionAr: 'صل الجذر بمجاله الدلالي.',
      items: [
        { text: "Chron-", answer: "Time" },
        { text: "Phil-", answer: "Love/Affection" },
        { text: "Anthropo-", answer: "Humanity" },
        { text: "Theo-", answer: "God/Deity" }
      ]
    }
  ],
  quiz: [
    {
      question: "What is the meaning of 'Circumspect' based on its etymology?",
      questionAr: "ما معنى كلمة 'Circumspect' بناءً على اشتقاقها اللغوي؟",
      options: ["Acting quickly", "Looking around carefully (wary)", "Going straight ahead", "Speaking loudly"],
      optionsAr: ["التصرف بسرعة", "الحذر والتروي (النظر حولك)", "الذهاب مباشرة", "التحدث بصوت عالٍ"],
      correctIndex: 1,
      explanation: "From 'Circum' (around) and 'Spec' (to look). It means being cautious and considering all risks.",
      explanationAr: "مشتقة من Circum (حول) و Spec (ينظر). تعني الحذر ومراعاة جميع المخاطر."
    }
  ]
};
