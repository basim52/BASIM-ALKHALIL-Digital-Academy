
import { Lesson, proficiencyLevel } from "../../types";

export const archaicClassicalC2: Partial<Lesson> = {
  title: "Archaic & Classical Literature",
  titleAr: "فك رموز الأدب الكلاسيكي والقديم",
  proficiencyLevel: proficiencyLevel.C2,
  warmup: {
    mission: "Navigate the complex syntax and forgotten vocabulary of 16th-19th century English literature to extract timeless universal themes.",
    missionAr: "التنقل عبر التراكيب النحوية المعقدة والمفردات المنسية للأدب الإنجليزي في القرون السادس عشر إلى التاسع عشر لاستخراج سمات عالمية خالدة.",
    objectives: [
      "Decode Early Modern English grammatical structures (e.g., Thou/Thee).",
      "Identify 'Allegory' in 18th-century prose.",
      "Compare the syntactic density of Victorian vs. Modern texts."
    ],
    objectivesAr: [
      "فك رموز التراكيب النحوية في الإنجليزية الحديثة المبكرة.",
      "تحديد 'الرمزية' (Allegory) في نثريات القرن الثامن عشر.",
      "مقارنة الكثافة التركيبية بين النصوص الفيكتورية والنصوص الحديثة."
    ]
  },
  content: `
### 1. Archaic Pronouns and Verbs (الضمائر والأفعال القديمة)
Reading Shakespeare or Milton requires translating ancient forms in real-time.
*   **Thou/Thee:** You (Subject/Object).
*   **Thy/Thine:** Your/Yours.
*   **-eth Suffix:** The old "-s" for third person. 
    *   *Example:* "He knoweth" = "He knows".

### 2. Syntactic Inversion (الانقلاب التركيبي)
Classical authors often move the verb before the subject for poetic or rhythmic reasons.
*   *Modern:* "I saw the flower."
*   *Archaic:* "The flower saw I." or "Saw I the flower."

### 3. Allegory vs. Metaphor (الرمزية مقابل الاستعارة)
*   **Metaphor:** "Her heart is gold." (One word/phrase).
*   **Allegory:** An entire story where every character and event represents a larger concept (e.g., *Animal Farm*).

| Archaic Word | Modern Equivalent | Arabic |
| :--- | :--- | :--- |
| **Wherefore** | Why | لماذا |
| **Hither / Thither** | Here / There | إلى هنا / إلى هناك |
| **Peradventure** | Perhaps | ربما |
| **Anon** | Soon / Immediately | قريباً / فوراً |
`,
  contentAr: `
### 1. الضمائر والأفعال القديمة (Archaic Forms)
تتطلب قراءة "شكسبير" أو "ميلتون" ترجمة فورية للأشكال القديمة.
*   **Thou / Thee:** تعني "أنت".
*   **Hath:** تعني "Has".
*   **Doth:** تعني "Does".

### 2. الانقلاب التركيبي (Syntactic Inversion)
غالباً ما يقدم الكتاب الكلاسيكيون الفعل على الفاعل لأسباب شعرية.
*   *بالحديث:* "I saw him."
*   *بالقديم:* "Him saw I."

### 3. الرمزية الممتدة (Allegory)
على عكس الاستعارة البسيطة، الرمزية هي نص كامل يمثل فيه كل شخص وكل حدث معنىً أعمق (مثل تمثيل الحيوانات للطبقات السياسية).

| الكلمة القديمة | المرادف الحديث | المعنى |
| :--- | :--- | :--- |
| **Wherefore** | Why | لماذا (بسبب ماذا) |
| **Anon** | Soon | قريباً |

> **نصيحة للخبير:** لا تنزعج من الكلمات التي لم تقابلها من قبل؛ ركز على "الإيقاع" و "السياق الكلي". الأدب الكلاسيكي يُقرأ بـ "الأذن" بقدر ما يُقرأ بـ "العقل".
`,
  exercises: [
    {
      type: 'fill',
      instruction: 'Translate to Modern English: "Wherefore art thou Romeo?"',
      instructionAr: 'ترجم للإنجليزية الحديثة: "Wherefore art thou Romeo?"',
      items: [
        { text: "_______ _______ you Romeo?", answer: "Why are" }
      ]
    }
  ],
  quiz: [
    {
      question: "What does 'Wherefore' mean in archaic English?",
      questionAr: "ماذا تعني كلمة 'Wherefore' في الإنجليزية القديمة؟",
      options: ["Where", "Why", "Whenever", "When"],
      optionsAr: ["أين", "لماذا (بسبب ماذا)", "كلما", "متى"],
      correctIndex: 1,
      explanation: "A common mistake is thinking it means 'where'. In the famous line from Romeo and Juliet, she is asking 'WHY are you Romeo?'",
      explanationAr: "خطأ شائع هو الاعتقاد بأنها تعني 'أين'. في جملة جولييت الشهيرة، هي تسأل 'لماذا أنت (بالتحديد) روميو؟' (تقصد: لماذا تنتمي لعائلة الأعداء؟)."
    }
  ]
};
