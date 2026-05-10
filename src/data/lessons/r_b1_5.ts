
import { Lesson, proficiencyLevel } from "../../types";

export const mediaJournalismB1: Partial<Lesson> = {
  title: "Media & Journalism Decoding",
  titleAr: "فك رموز الإعلام والصحافة",
  proficiencyLevel: proficiencyLevel.B1,
  warmup: {
    mission: "Learn how to read news articles effectively by understanding headlines, leads, and 5W1H facts.",
    missionAr: "تعلم كيفية قراءة المقالات الإخبارية بفعالية من خلال فهم العناوين، المقدمات، والحقائق الأساسية.",
    objectives: [
      "Decode newspaper headlines (often using short, impactful words).",
      "Identify the 'Lead' paragraph and its importance.",
      "Extract 5W1H (Who, What, Where, When, Why, How) from a short report."
    ],
    objectivesAr: [
      "فك رموز عناوين الصحف (التي تستخدم غالباً كلمات قصيرة ومؤثرة).",
      "تحديد فقرة 'المقدمة' (Lead) وأهميتها.",
      "استخراج الحقائق الست (من، ماذا، أين، متى، لماذا، كيف) من تقرير قصير."
    ]
  },
  content: `
### 1. Anatomy of a News Article (تشريح المقال الإخباري)
A news article has a specific visual and logical structure.

1.  **Headline (العنوان):** Large text to catch attention. (e.g., "ECONOMY GROWS 5%")
2.  **Byline (اسم الكاتب):** "By Jane Doe".
3.  **The Lead (المقدمة):** The first 1-2 sentences. It contains the most important info.
4.  **Body (المحتوى):** Supporting details and quotes from people.

### 2. Headlines Logic (منطق العناوين)
Headlines often remove small words (a, the, is) to save space.
*   *Headline:* "MAN SAVES CAT"
*   *Full Sentence:* "A man saved a cat."

### 3. Verification Skills (مهارات التحقق)
In B1 media literacy, you should check for:
*   **Sources:** Who said it? (Experts? Police? Witnesses?)
*   **Quotes:** Exact words in "quotation marks".

| Label | Meaning |
| :--- | :--- |
| **Urgent / Breaking** | Happening right now. |
| **Exclusive** | Only this newspaper has the story. |
| **Live Update** | The story is changing constantly. |
`,
  contentAr: `
### 1. أجزاء المقال الإخباري (Anatomy of News)
للمقال الإخباري هيكل بصري ومنطقي محدد.

1.  **العنوان (Headline):** نص كبير لجذب الانتباه. (مثال: نمو الاقتصاد بنسبة 5%).
2.  **المقدمة (The Lead):** أول جملة أو جملتين. تحتوي على أهم المعلومات.
3.  **المحتوى (Body):** التفاصيل الداعمة واقتباسات من الناس.

### 2. منطق العناوين (Headlines Logic)
غالباً ما تحذف العناوين الكلمات الصغيرة (مثل a, the, is) لتوفير المساحة.
*   *العنوان:* "رجل ينقذ قطة" (MAN SAVES CAT)
*   *الجملة الكاملة:* "رجلٌ ما قام بإنقاذ قطة."

### 3. مهارات التحقق (Verification)
في الثقافة الإعلامية للمستوى B1، يجب عليك التحقق من:
*   **المصادر (Sources):** من قال هذا؟ (خبراء؟ شرطة؟ شهود عيان؟)
*   **الاقتباسات (Quotes):** الكلمات الدقيقة بين "علامات تنصيص".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Identify the missing part of the article.',
      instructionAr: 'حدد الجزء الناقص من المقال.',
      items: [
        { text: "The title of the news is the ______.", textAr: "عنوان الخبر يسمى ______." },
        { text: "The first paragraph is called the ______.", textAr: "الفقرة الأولى تسمى ______." },
        { text: "The words of a person are put in ______ marks.", textAr: "كلمات الشخص توضع بين علامات ______." }
      ]
    }
  ],
  quiz: [
    {
      question: "Where is the most important information in a news story?",
      questionAr: "أين تقع أهم معلومة في القصة الإخبارية؟",
      options: ["The last sentence", "The middle", "The Lead (First paragraph)", "The page number"],
      optionsAr: ["الجملة الأخيرة", "في المنتصف", "المقدمة (الفقرة الأولى)", "رقم الصفحة"],
      correctIndex: 2,
      explanation: "Journalists put the most vital facts in the first paragraph (The Lead).",
      explanationAr: "يضع الصحفيون الحقائق الأكثر حيوية في الفقرة الأولى (المقدمة)."
    }
  ]
};
