import express from "express";
import { GoogleGenAI, Modality } from "@google/genai";
import "dotenv/config";

const app = express();
app.use(express.json());

const getAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });
};

async function callAiWithRetry(options: any, maxRetries = 2) {
  let lastError: any;
  const PRIMARY_MODEL = "gemini-3.5-flash";
  const FALLBACK_MODEL = "gemini-3.5-flash";
  const ai = getAI();

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const modelName = i === maxRetries ? FALLBACK_MODEL : PRIMARY_MODEL;
      const result = await ai.models.generateContent({
        ...options,
        model: modelName
      });
      return result;
    } catch (error: any) {
      lastError = error;
      const isTransient = error.message?.includes("503") || error.message?.includes("UNAVAILABLE") || error.message?.includes("high demand");
      
      if (isTransient && i < maxRetries) {
        const delay = Math.pow(2, i) * 1000;
        await new Promise(r => setTimeout(r, delay));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

// Format conversational history cleanly to prevent non-alternating role errors (Alternating user/model)
function formatGeminiHistory(history: any[], newPromptText: string) {
  const contents: any[] = [];
  const rawHistory = Array.isArray(history) ? history : [];

  for (const turn of rawHistory) {
    const role = turn.role === 'user' ? 'user' : 'model';
    const text = (turn.text || "").trim();
    if (!text) continue;

    if (contents.length > 0 && contents[contents.length - 1].role === role) {
      contents[contents.length - 1].parts[0].text += "\n" + text;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
    contents[contents.length - 1].parts[0].text += "\n" + newPromptText;
  } else {
    contents.push({ role: 'user', parts: [{ text: newPromptText }] });
  }

  return contents;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Get highly smart, context-aware, educational responses based on the active lesson details and vocabulary
function getSmartLessonFallbackResponse(prompt: string, context: string): string {
  const rawPrompt = (prompt || "").toString();
  const norm = rawPrompt.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟?]/g, "");
  const ctx = (context || "").toString();
  const isAr = /[\u0600-\u06FF]/.test(rawPrompt);

  let lessonTitle = "";
  const titleMatch = ctx.match(/LESSON TITLE:\s*(.*)/i);
  if (titleMatch && titleMatch[1]) {
    lessonTitle = titleMatch[1].trim();
  }

  let vocabularyList: { word: string; translation: string }[] = [];
  const vocabSectionIndex = ctx.indexOf("VOCABULARY KEYWORDS FOR THIS LESSON:");
  if (vocabSectionIndex !== -1) {
    const remaining = ctx.substring(vocabSectionIndex + "VOCABULARY KEYWORDS FOR THIS LESSON:".length);
    const endOfSection = remaining.indexOf("LESSON ASSESSMENTS") !== -1 ? remaining.indexOf("LESSON ASSESSMENTS") : remaining.length;
    const vocabText = remaining.substring(0, endOfSection);
    const lines = vocabText.split("\n");
    for (const line of lines) {
      if (line.includes("-") && (line.includes(":") || line.includes(" - "))) {
        const parts = line.split(/[-:]/);
        if (parts.length >= 2) {
          const word = parts[0].replace(/[-\*\s]/g, "").trim();
          const trans = parts[1].trim();
          if (word && trans) {
            vocabularyList.push({ word, translation: trans });
          }
        }
      }
    }
  }

  let quizQuestions: string[] = [];
  const quizIndex = ctx.indexOf("LESSON ASSESSMENTS/QUIZZES:");
  if (quizIndex !== -1) {
    const remaining = ctx.substring(quizIndex + "LESSON ASSESSMENTS/QUIZZES:".length);
    const lines = remaining.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if ((trimmed.startsWith("-") || trimmed.slice(0,3).match(/^\d+/) || trimmed.startsWith("*")) && trimmed.length > 10) {
        quizQuestions.push(trimmed.replace(/^[-\*\d\.\s]+/, "").trim());
      }
    }
  }

  const isVocabQuery = norm.includes("ترجم") || norm.includes("معنى") || norm.includes("معاني") || norm.includes("تعريف") || norm.includes("كلمات") || norm.includes("vocab") || norm.includes("meaning") || norm.includes("translate") || norm.includes("word");
  if (isVocabQuery) {
    if (vocabularyList.length > 0) {
      if (isAr) {
        let reply = `بالتأكيد! إليك قائمة بمفردات درس اليوم وتراجمها الدقيقة لتثبيتها في ذهنك:\n\n`;
        vocabularyList.slice(0, 5).forEach((v) => {
          reply += `• **${v.word}** : ${v.translation}\n`;
        });
        reply += `\n💡 نصيحة المعلم: ممارسة هذه الكلمات في جمل تبني ثقتك اللغوية بسرعة كبيرة! هل هناك كلمة محددة تريد تفكيكها أكثر؟`;
        return reply;
      } else {
        let reply = `Absolutely! Here are the key vocabulary keywords and terms from today's lesson details:\n\n`;
        vocabularyList.slice(0, 5).forEach((v) => {
          reply += `• **${v.word}** : ${v.translation}\n`;
        });
        reply += `\n💡 Pro-tip: Try using these terms in short sentences to ensure permanent memory alignment! Would you like a deep breakdown of any specific word?`;
        return reply;
      }
    } else {
      if (isAr) {
        return `أهلاً بك! مفردات درس اليوم ممتازة لتعزيز طلاقتك. على سبيل المثال، يمكنك تصفح كلمات المعمل وبطاقات الاستذكار المتاحة في الواجهة الرئيسية للدرس لتدقيق النطق والتهجئة. هل تريد مساعدتي في تركيب جملة ممتعة؟`;
      } else {
        return `Hello! Today's vocabulary set is highly focused on modern conversational skills. You can review the Flashcards tab in today's workbook. Let me know if you would like to construct sentences together!`;
      }
    }
  }

  const isQuizQuery = norm.includes("اختبرني") || norm.includes("تحداني") || norm.includes("سؤال") || norm.includes("تحدي") || norm.includes("اختبار") || norm.includes("test") || norm.includes("quiz") || norm.includes("challenge") || norm.includes("question");
  if (isQuizQuery) {
    if (quizQuestions.length > 0) {
      const selectedQuiz = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
      if (isAr) {
        return `حسناً يا بطل! لتقييم استيعابك وتلقيك لدرس اليوم المتميز، أتحداك بالإجابة عن هذا السؤال المختار من تحديات الدرس:\n\n💬 **${selectedQuiz}**\n\nاكتب لي إجابتك وسأقوم بتعديلها ومراجعتها معك فوراً بكل سرور! ✨`;
      } else {
        return `Challenge accepted, champion! Let's test your academic understanding. Try to solve this direct quiz challenge from today's lesson:\n\n💬 **${selectedQuiz}**\n\nReply with your answer and I'll review and guide you right away! ✨`;
      }
    } else {
      if (isAr) {
        return `حسناً! دعني أصيغ لك تحدياً لغوياً فورياً لدرس اليوم: قم بكتابة جملة كاملة توفق فيها بين كلمة في الدرس والماضي البسيط، وسأقوم بفحص قواعدها ونطقها معك!`;
      } else {
        return `Perfect! Let me challenge you right now: Try rewriting the main sentence pattern of this lesson using a simple past format, and I'll review the grammar for you!`;
      }
    }
  }

  const isExplainQuery = norm.includes("بسط") || norm.includes("سهل") || norm.includes("شرح") || norm.includes("اشرح") || norm.includes("توضيح") || norm.includes("explain") || norm.includes("simplify") || norm.includes("explanation");
  if (isExplainQuery) {
    let explanation = "";
    const expBlockIndex = ctx.indexOf("LESSON ENTIRE EXPLANATION/CONTENT");
    if (expBlockIndex !== -1) {
      const textArea = ctx.substring(expBlockIndex);
      const textLines = textArea.split("\n").slice(1, 8);
      explanation = textLines.filter(l => l.trim().length > 15).slice(0, 3).join("\n").replace(/[*#]/g, "").trim();
    }

    if (explanation) {
      if (isAr) {
        return `بالتأكيد يا بطل! درس اليوم يركز بشكل رائع وكبير على الموضوع الأساسي لتمكين طلاقتك. إليك ملخصاً وتبسيطاً لأهم النقاط الأساسية التي يتناولها بالتحليل:\n\n${explanation}\n\n💡 نصيحة: يمكنك تجربة حل التدريبات التفاعلية المتاحة والرجوع إليّ مباشرة لشرح أي جزئية تغلق عليك!`;
      } else {
        return `No problem! Today's lesson focusing on "${lessonTitle || 'Our Active Lesson'}" is simplified right here. Here is a brief and practical breakdown of its core concept:\n\n${explanation}\n\n💡 Practice recommendation: Try the interactive workbook exercises down below and speak up with any query!`;
      }
    } else {
      if (isAr) {
        return `بالتأكيد! درس اليوم بعنوان **"${lessonTitle || 'درس اليوم'}"** يحمل أفكاراً ممتازة لتركيب الجمل الأكاديمية بنحت متميز. يهدف الدرس إلى تدريبك على مخارج الألفاظ وصياغة القواعد باحترافية. ما هي النقطة الدقيقة التي تود مني توضيحها ومناقشتها معك؟`;
      } else {
        return `Certainly! Today's unit of study **"${lessonTitle || 'Our Active Lesson'}"** aims to build robust English structuring confidence. It sharpens syntactic awareness and conversational ease. Which specific rule or section should we detail together?`;
      }
    }
  }

  if (isAr) {
    return `أهلاً بك يا بطل في درس اليوم **"${lessonTitle || 'هذا الدرس الممتاز'}"**! 👋
أنا رفيقتك التعليمية الأكاديمية، جاهزة دائماً لشرح القواعد وتوضيح المفردات ومناقشة تحديات الدرس معك. 

سؤالك مميز جداً ويصنع فارقاً! للتأقلم السريع مع تحدي اليوم، يمكنك أن تطلب مني:
1. **"ترجم كلمات الدرس"** لرؤية مفردات اليوم وتراجمها الفعالة.
2. **"اشرح لي الدرس"** لتبسيط القواعد بعبارات سهلة ومرحة.
3. **"اختبرني بسؤال"** لقياس مدى استيعابك للمصطلحات بالكامل.

أنا بانتظارك، تفضل بكتابة ما يروق لك وسأتكامل معك فوراً!`;
  } else {
    return `Welcome, champion, to today's interactive lesson: **"${lessonTitle || 'Active English Unit'}"**! 👋
I am your smart classroom co-pilot. I analyze this lesson plan directly to give you tailored grammar assistance, translations, and pronunciations.

To interact efficiently, you can ask me to:
1. **"Translate vocabulary"** to explore key terms and meanings.
2. **"Explain the lesson rules"** for a quick and fun visual summary.
3. **"Quiz me with a question"** to test your current understanding of the materials.

Looking forward to your reply. Tell me what we're tackling first!`;
  }
}

function getSmartFallbackResponse(prompt: string, history: any[]): string {
  const rawPrompt = (prompt || "").toString();
  const norm = rawPrompt.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()؟?]/g, "");
  const historyArr = Array.isArray(history) ? history : [];
  const turnCount = historyArr.length;
  const isAr = /[\u0600-\u06FF]/.test(rawPrompt);
  const dynamicSeed = norm.length + turnCount;

  if (isAr) {
    if (norm.includes("غير متسق") || norm.includes("غير متناسق") || norm.includes("خطأ") || norm.includes("تكرار") || norm.includes("مشكلة")) {
      return "أعتذر منك بشدة يا صديقي! فخور جداً بوعيك ودقتك الأكاديمية الرائعة. سأعمل فوراً على جعل حديثنا أكثر اتساقاً ودقة لتبني طلاقة حقيقية. ما هو الموضوع المفضل لديك لنناقشه الآن؟";
    }
    return "أشكرك جداً على مشاركتي الحوار الراقي! الاستمرار والمحاولة المستمرة تصنع فارقاً لغوياً هائلاً. ما هي فكرتك أو جملتك القادمة لنتحاور عنها الآن؟";
  } else {
    if (norm.includes("inconsistent") || norm.includes("wrong") || norm.includes("error")) {
      return "I sincerely apologize! Thank you for your sharp eye for precision. Let's redirect our dialogue towards a standard practice topic like hobbies or travel.";
    }
    return "Thank you for practicing with me! Step-by-step contextual dialogue makes English confidence effortless. What topic should we explore next?";
  }
}

// Root test route
app.get("/ping", (req, res) => {
  res.send("pong_from_api_folder");
});

// Health check
app.get("/api/health", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const key = process.env.GEMINI_API_KEY;
  res.json({ 
    status: "ok", 
    geminiKeySet: !!key,
    geminiKeyPrefix: key ? `${key.substring(0, 4)}...` : null, // Show prefix to help identify key
    env: process.env.NODE_ENV || "not set",
    server: "Vercel Serverless Function",
    time: new Date().toISOString()
  });
});

// Chat Endpoints
app.post("/api/lesson/chat", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });
    
    let ai;
    try {
      ai = getAI();
    } catch (err) {
      const reply = getSmartLessonFallbackResponse(prompt, context || "");
      return res.json({ text: reply });
    }

    const promptText = `
      SYSTEM: You are a helpful teaching assistant for Basim Alkhalil Digital Academy.
      
      CONTEXT:
      ${context}
      
      USER QUESTION:
      ${prompt}
    `;

    const result = await callAiWithRetry({
      contents: [{ role: 'user', parts: [{ text: promptText }] }]
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Chat Error:", error);
    const fallbackReply = getSmartLessonFallbackResponse(req.body.prompt || "", req.body.context || "");
    res.json({ text: fallbackReply });
  }
});

// Lesson generation
app.post("/api/lesson/generate", async (req, res) => {
  try {
    const { category, level, topic } = req.body;
    if (!topic) return res.status(400).json({ error: "Missing topic" });

    const ai = getAI();
    const promptText = `
      SYSTEM: Generate educational content in JSON matching the requested structure.
      
      USER REQUEST:
      Topic: "${topic}".
      Category: ${category}
      Level: ${level}
      
      Task: Create a deep, high-quality interactive lesson with specialized sections (warmup, content, exercises, quiz).
      Output JSON STRICTLY following the schema. Ensure everything is in BOTH English and Professional Academic Arabic.
      JSON format: { "title": "...", "titleAr": "...", "warmup": {...}, "content": "...", "contentAr": "...", "imageryPrompt": "...", "exercises": [...], "quiz": [...] }
    `;

    const result = await callAiWithRetry({
      contents: [{ role: 'user', parts: [{ text: promptText }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!result || !result.text) throw new Error("Empty response from AI");
    
    let cleanText = result.text.trim();
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    }
    res.json(JSON.parse(cleanText));
  } catch (error: any) {
    console.error("Lesson Generate Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate lesson content" });
  }
});

// Language partner
app.post("/api/ai-partner/chat", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    
    let ai;
    try {
      ai = getAI();
    } catch (err) {
      const reply = getSmartFallbackResponse(prompt, history);
      return res.json({ text: reply });
    }

    const promptText = `
      SYSTEM: You are a professional Oxford English Language Partner. Respond naturally.
      
      USER MESSAGE: ${prompt}
    `;

    const result = await callAiWithRetry({
      contents: formatGeminiHistory(history, promptText)
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Partner Chat Error:", error);
    const fallbackReply = getSmartFallbackResponse(req.body.prompt || "", req.body.history || []);
    res.json({ text: fallbackReply });
  }
});

// AI Analysis
app.post("/api/admin/analyze", async (req, res) => {
  try {
    const { data } = req.body;
    
    const ai = getAI();
    const result = await callAiWithRetry({
      contents: [{ 
        role: 'user', 
        parts: [{ 
          text: `Analyze this data: ${JSON.stringify(data)}\n\nPrompt: as an expert Academy Director, provide a Markdown report.` 
        }] 
      }]
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to analyze" });
  }
});

// Global error handler for the API - MUST BE LAST
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("API Error Handling:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ 
    error: "Internal Server Error", 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
  });
});

export default app;
