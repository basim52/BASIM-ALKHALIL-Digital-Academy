import { CurriculumCategory, proficiencyLevel, Lesson } from "../types";
import { MASTER_CURRICULUM } from "../data/masterCurriculum";

function extractJson(text: string | undefined): any {
  if (!text) return null;
  
  const arrayStart = text.indexOf('[');
  const objectStart = text.indexOf('{');
  
  if (arrayStart === -1 && objectStart === -1) return null;
  
  const isArray = arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart);
  const startChar = isArray ? '[' : '{';
  const endChar = isArray ? ']' : '}';
  
  const startIdx = text.indexOf(startChar);
  const endIdx = text.lastIndexOf(endChar);
  
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return null;
  
  const jsonStr = text.substring(startIdx, endIdx + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("JSON Parse Error:", e);
    return null;
  }
}

export async function generateCurriculumUnits(
  category: CurriculumCategory,
  level: proficiencyLevel
): Promise<{ id: string, title: string, titleAr: string, description: string, descriptionAr: string }[]> {
  try {
    // Return from high-quality pre-defined curriculum instead of AI generation
    const units = MASTER_CURRICULUM[category]?.[level] || [];
    return units;
  } catch (error) {
    console.error("Error loading curriculum units:", error);
    return [];
  }
}

export async function generateLessonContent(
  category: CurriculumCategory,
  level: proficiencyLevel,
  topic: string,
  lang: 'ar' | 'en'
): Promise<Partial<Lesson>> {
  try {
    const resp = await fetch('/api/lesson/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, level, topic, lang })
    });

    if (!resp.ok) {
      throw new Error(`Server responded with ${resp.status}`);
    }

    const data = await resp.json();
    
    return {
      title: data.title || topic,
      titleAr: data.titleAr || topic,
      warmup: data.warmup,
      content: data.content || "Lesson content loading...",
      contentAr: data.contentAr || "جاري تحميل محتوى الدرس...",
      readingText: data.readingText,
      vocabulary: data.vocabulary,
      imageryPrompt: data.imageryPrompt || topic,
      exercises: data.exercises,
      quiz: Array.isArray(data.quiz) ? data.quiz : (data.quiz ? [data.quiz] : []),
      proficiencyLevel: level
    };
  } catch (error) {
    console.error("Lesson generation failed, using fallback:", error);
    return fallbackLesson(topic, level);
  }
}

function fallbackLesson(topic: string, level: string): Partial<Lesson> {
  return {
    title: topic,
    titleAr: topic,
    warmup: {
      mission: `Deeply understand the foundations of ${topic}.`,
      missionAr: `فهم عميق لأسس ${topic}.`,
      objectives: ["Identify core concepts", "Apply basic rules", "Execute practical exercises"],
      objectivesAr: ["تحديد المفاهيم الأساسية", "تطبيق القواعد الأساسية", "تنفيذ التمارين العملية"]
    },
    content: `## Introductory Lesson: ${topic}\n\nWelcome to your personalized lesson. Currently, we are experiencing high traffic, but your learning doesn't stop. This topic covers the core aspects of ${topic} at the ${level} level.`,
    contentAr: `## درس مقدمة: ${topic}\n\nمرحباً بك في درسك المخصص. نحن نواجه بعض الضغط التقني حالياً، لكن تعلمك لا يتوقف. يغطي هذا الموضوع الجوانب الجوهرية لـ ${topic} بالمستوى ${level}.`,
    imageryPrompt: "Education and learning concepts",
    exercises: [
      {
        type: 'fill',
        instruction: 'Fill in the blanks with appropriate concepts.',
        instructionAr: 'املأ الفراغات بالمفاهيم المناسبة.',
        items: [{ text: "The first step is understanding...", textAr: "الخطوة الأولى هي فهم..." }]
      }
    ],
    quiz: [
      {
        question: `What is the foundational concept when mastering "${topic}"?`,
        questionAr: `ما هو المفهوم الأساسي عند إتقان موضوع: "${topic}"؟`,
        options: [
          `Understanding the structure and contextual application of ${topic}`,
          "Translating word by word without grammar awareness",
          "Memorizing text blindly without speaking practice",
          "Ignoring feedback and avoiding repetition"
        ],
        optionsAr: [
          `فهم البنية اللغوية والتطبيق العملي لـ ${topic} في سياق سليم`,
          "الترجمة الحرفية كلمة بكلمة دون مراعاة القواعد",
          "الحفظ الأصم دون ممارسة نطق مسموعة",
          "تجاهل التغذية الراجعة وعدم التكرار"
        ],
        correctIndex: 0,
        explanation: `Mastery of "${topic}" requires deep comprehension and contextual usage.`,
        explanationAr: `إتقان "${topic}" يتطلب فهماً عميقاً وتطبيقاً عملياً في السياق السليم.`
      },
      {
        question: `How do you apply "${topic}" in everyday conversational English?`,
        questionAr: `كيف تطبق موضوع "${topic}" في المحادثة الإنجليزية اليومية؟`,
        options: [
          "By practicing natural sentences aloud with correct pronunciation",
          "By avoiding speaking and only reading silently",
          "By using complex words that do not fit the context",
          "By waiting to reach fluency before saying your first sentence"
        ],
        optionsAr: [
          "بالممارسة الصوتية المسموعة والتحدث بجمل طبيعية ذات نطق سليم",
          "بتجنب التحدث والاكتفاء بالقراءة الصامتة",
          "باستخدام كلمات معقدة لا تناسب السياق",
          "بالانتظار حتى تصل للكمال قبل أن تنطق جملتك الأولى"
        ],
        correctIndex: 0,
        explanation: "Speaking practice accelerates active vocabulary retention.",
        explanationAr: "الممارسة الصوتية تسرّع حفظ واستدعاء التراكيب اللغوية في الدماغ."
      },
      {
        question: `What is the key takeaway after completing "${topic}"?`,
        questionAr: `ما هي الثمرة التعليمية المستفادة بعد إتمام درس "${topic}"؟`,
        options: [
          "Building confidence to produce original sentences autonomously",
          "Relying permanently on translation dictionaries",
          "Stopping practice once the lesson ends",
          "Avoiding real-world English communication"
        ],
        optionsAr: [
          "بناء الثقة لإنتاج جمل أصلية من إنشائك الذاتي بطلاقة",
          "الاعتماد الدائم على قواميس الترجمة الحرفية",
          "التوقف عن التدريب بمجرد انتهاء الدرس",
          "تجنب التواصل الحقيقي باللغة الإنجليزية"
        ],
        correctIndex: 0,
        explanation: "Autonomous sentence production is the hallmark of language fluency.",
        explanationAr: "الإنتاج التلقائي للجمل هو المعيار الأسمى للطلاقة اللغوية الحقيقية."
      }
    ]
  };
}
