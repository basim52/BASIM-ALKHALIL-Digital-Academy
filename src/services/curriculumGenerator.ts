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
    readingText: {
      type: Type.OBJECT,
      properties: {
        paragraphs: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ar: { type: Type.STRING }
            },
            required: ["en", "ar"]
          }
        }
      },
      required: ["paragraphs"]
    },
    vocabulary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          phonetic: { type: Type.STRING },
          meaningAr: { type: Type.STRING },
          example: { type: Type.STRING }
        },
        required: ["word", "phonetic", "meaningAr", "example"]
      }
    },
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
  required: ["title", "titleAr", "content", "contentAr", "quiz", "warmup", "exercises", "readingText", "vocabulary"]
};

export async function generateLessonContent(
  category: CurriculumCategory,
  level: proficiencyLevel,
  topic: string,
  lang: 'ar' | 'en'
): Promise<Partial<Lesson>> {
  const isReadingOrExpression = category === CurriculumCategory.READING || category === CurriculumCategory.EXPRESSION;

  const prompt = `
    You are an expert academic curriculum designer for Basim Alkhalil Digital Academy.
    Topic: "${topic}".
    Category: ${category}
    Level: ${level} (Oxford/CEFR Standard)
    
    Task: Create a deep, high-quality interactive lesson with specialized sections.
    
    CRITICAL INSTRUCTIONS:
    1. SECTION 1: WARM-UP (التهيئة)
       - Mission: A "Mission" statement explaining the lesson's goal.
       - Objectives: 3 clear educational objectives.
    2. SECTION 2: THE CORE TEXT/SCENARIO (النص الأساسي)
       - Paragraphs: At least 3-4 segments (English + Professional Arabic).
       - For READING: Each paragraph should be part of a informative or narrative text.
       - For EXPRESSION: Each paragraph should describe a specific scenario, social situation, or logical problem to be analyzed.
    3. SECTION 3: VOCABULARY (المفردات)
       - Provide 4-6 key terms found in the text.
       - Each MUST have: Word, Phonetic, MeaningAr, and Example.
    4. SECTION 4: EXPLANATION (الشرح)
       - Content: Deep, step-by-step logic in Markdown.
       - Use tables/formulas for key rules.
    5. SECTION 5: EXERCISES (التمارين)
       - Create 2 interactive exercises (fill, match, or drag).
    6. SECTION 6: QUIZ (الاختبار)
       - At least 5 high-quality quiz questions verifying deep comprehension.
    
    Output JSON STRICTLY following the schema. Ensure everything is in BOTH English and Professional Academic Arabic.
  `;

  let lastError: any = null;
  const maxRetries = 2;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
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
    } catch (error: any) {
      lastError = error;
      console.error(`Lesson Generation attempt ${attempt + 1} failed:`, error);
      
      // If it's a 503 or 429, wait before retrying
      if (attempt < maxRetries && (error.message?.includes('503') || error.message?.includes('429') || error.status === 503)) {
        await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
        continue;
      }
      break; 
    }
  }

  console.error("Deep Lesson Generation Final Failure:", lastError);
  return fallbackLesson(topic, level);
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
