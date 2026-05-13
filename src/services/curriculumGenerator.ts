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
    quiz: [{
      question: "Is learning important at Basim Alkhalil Academy?",
      questionAr: "هل التعلم مهم في أكاديمية باسم الخليل؟",
      options: ["Yes", "No", "Maybe", "I don't know"],
      optionsAr: ["نعم", "لا", "ربما", "لا أعرف"],
      correctIndex: 0,
       explanation: "Education is the key to success.",
       explanationAr: "التعليم هو مفتاح النجاح."
    }]
  };
}
