import { GoogleGenAI, Type } from "@google/genai";
import { CurriculumCategory, proficiencyLevel, Lesson } from "../types";
import { MASTER_CURRICULUM } from "../data/masterCurriculum";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

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

/**
 * Enhanced schema for strictly valid educational content
 */
const lessonSchema = {
  description: "Strictly formatted educational lesson data",
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    titleAr: { type: Type.STRING },
    warmup: {
      type: Type.OBJECT,
      properties: {
        mission: { type: Type.STRING },
        missionAr: { type: Type.STRING },
        objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
        objectivesAr: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["mission", "missionAr", "objectives", "objectivesAr"]
    },
    content: { type: Type.STRING, description: "Detailed Markdown lesson content in English" },
    contentAr: { type: Type.STRING, description: "Detailed Markdown lesson content in Arabic" },
    imageryPrompt: { type: Type.STRING, description: "Image generation prompt for Unsplash" },
    exercises: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["fill", "match", "multiple", "drag"] },
          instruction: { type: Type.STRING },
          instructionAr: { type: Type.STRING },
          items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, textAr: { type: Type.STRING }, answer: { type: Type.STRING } } } }
        },
        required: ["type", "instruction", "instructionAr", "items"]
      }
    },
    quiz: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          questionAr: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          optionsAr: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctIndex: { type: Type.NUMBER },
          explanation: { type: Type.STRING },
          explanationAr: { type: Type.STRING }
        },
        required: ["question", "questionAr", "options", "optionsAr", "correctIndex", "explanation", "explanationAr"]
      }
    }
  },
  required: ["title", "titleAr", "content", "contentAr", "quiz", "warmup", "exercises"]
};

export async function generateLessonContent(
  category: CurriculumCategory,
  level: proficiencyLevel,
  topic: string,
  lang: 'ar' | 'en'
): Promise<Partial<Lesson>> {
  const prompt = `
    You are an expert academic curriculum designer for Basim Alkhalil Digital Academy.
    Topic: "${topic}".
    Category: ${category}
    Level: ${level} (Oxford/CEFR Standard)
    
    Task: Create a deep, high-quality interactive lesson with 4 distinct sections.
    
    CRITICAL INSTRUCTIONS:
    1. SECTION 1: WARM-UP (التهيئة)
       - Mission: A "Mission" statement explaining the lesson's goal.
       - Objectives: 3 clear educational objectives.
    2. SECTION 2: EXPLANATION (الشرح)
       - Content: Deep, step-by-step logic.
       - Examples: At least 5-7 clear examples (English + Arabic translation).
       - Rules: Use "> **Formula/Rule:** [Logic]" for key takeaways.
       - Use data tables in Markdown where possible.
    3. SECTION 3: EXERCISES (التمارين)
       - Create 2 interactive exercises (fill, match, or drag).
       - Exercise 1: Fill in the blanks.
       - Exercise 2: Matching concepts.
    4. SECTION 4: QUIZ (الاختبار)
       - At least 5 high-quality quiz questions.
       - Each question MUST have a detailed explanationAr explaining "why" it's correct.
    5. MULTILINGUAL: Everything must be in BOTH English and Professional Academic Arabic.
    6. HIERARCHY: Level A1 should be simple and translated. C2 should be academic and complex.
    
    Output JSON STRICTLY following the schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: lessonSchema as any
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    const data = extractJson(text);
    
    if (!data) {
      console.warn("AI returned invalid JSON structure, using fallback");
      return fallbackLesson(topic, level);
    }
    
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
    console.error("Deep Lesson Generation Failed:", error);
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
