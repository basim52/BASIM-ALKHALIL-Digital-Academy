import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Modality } from "@google/genai";

const logToFile = (msg: string) => console.log(`[Server] ${msg}`);

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ noServer: true });
  const PORT = 3000;

  const getApiKey = () => {
    const key = (
      process.env.GEMINI_API_KEY || 
      process.env.GOOGLE_API_KEY || 
      process.env.VITE_GEMINI_API_KEY || 
      process.env.AI_STUDIO_API_KEY ||
      ""
    ).trim();
    return key;
  };

  let API_KEY = getApiKey();
  
  // Diagnostic logging
  logToFile(`Environment check: GEMINI_API_KEY=${!!process.env.GEMINI_API_KEY}, GOOGLE_API_KEY=${!!process.env.GOOGLE_API_KEY}, NODE_ENV=${process.env.NODE_ENV}`);
  
  if (!API_KEY) {
    logToFile("CRITICAL: No API Key found in environment variables!");
  } else {
    logToFile(`API Key identified (using ${process.env.GEMINI_API_KEY ? 'GEMINI_API_KEY' : 'fallback'}). Length: ${API_KEY.length}`);
  }

  let ai: GoogleGenerativeAI;
  let aiLive: GoogleGenAI;

  const initAI = () => {
    const key = getApiKey();
    if (key) {
      ai = new GoogleGenerativeAI(key);
      aiLive = new GoogleGenAI({ apiKey: key });
      return true;
    }
    return false;
  };

  initAI();

  // Robust AI caller with retry and fallback
  async function callAiWithRetry(options: any, maxRetries = 2) {
    let lastError: any;
    const PRIMARY_MODEL = "gemini-1.5-flash"; 

    for (let i = 0; i <= maxRetries; i++) {
      if (!ai && !initAI()) {
        throw new Error("Gemini API key is not configured on the server.");
      }
      
      try {
        let modelToUse = PRIMARY_MODEL;
        if (i === 1) modelToUse = "gemini-1.5-flash-002";
        if (i === 2) modelToUse = "gemini-1.5-flash-8b";
        
        logToFile(`AI Call Attempt ${i+1}/${maxRetries+1} using ${modelToUse} (API Key Status: ${!!API_KEY})`);
      
      const { contents, config } = options;
      
      const model = ai.getGenerativeModel({ model: modelToUse });
      const result = await model.generateContent({
        contents: contents,
        generationConfig: config
      });
      
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        logToFile(`AI Response check: No text found in result from ${modelToUse}`);
      }
      return { text };
      } catch (error: any) {
        lastError = error;
        logToFile(`AI Error on ${i}: ${error.message}`);
        
        const isTransient = error.message?.includes("503") || 
                           error.message?.includes("UNAVAILABLE") || 
                           error.message?.includes("high demand") ||
                           error.message?.includes("quota") ||
                           error.message?.includes("429");
        
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

  // Debug Headers
  app.use((req, res, next) => {
    res.setHeader('X-Debug-Path', req.path);
    res.setHeader('X-Debug-Env', process.env.NODE_ENV || 'undefined');
    next();
  });

  // Root test route
  app.get("/ping", (req, res) => {
    res.send("pong_v4_stable");
  });

  // API Routes
  app.get("/api/debug/env", (req, res) => {
    const keys = Object.keys(process.env).filter(k => 
      k.includes('API') || k.includes('KEY') || k.includes('GOOGLE') || k.includes('GEMINI')
    );
    res.json({ keys, nodeEnv: process.env.NODE_ENV });
  });

  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      geminiKeySet: !!process.env.GEMINI_API_KEY,
      nodeEnv: process.env.NODE_ENV || 'undefined',
      time: new Date().toISOString()
    });
  });

  server.on('upgrade', (request, socket, head) => {
    const rawUrl = request.url || '';
    const pathname = rawUrl.split('?')[0]; // Simple path extraction
    
    logToFile(`Upgrade request for pathname: ${pathname} (Full: ${rawUrl}) from ${request.headers.origin || 'unknown'}`);
    
    // Support both with and without trailing slash
    if (pathname === '/ws/live' || pathname === '/ws/live/') {
      logToFile('Handshaking /ws/live - Matches!');
      wss.handleUpgrade(request, socket, head, (ws) => {
        logToFile('Upgrade completed successfully');
        wss.emit('connection', ws, request);
      });
    } else {
      logToFile(`Ignored upgrade for ${pathname} - No match.`);
      // We don't destroy socket here to allow other potential upgrade handlers (like Vite) to run
    }
  });

  app.use(express.json());

  // Regular Chat Endpoint for Lessons
  app.post("/api/lesson/chat", async (req, res) => {
    logToFile(`START /api/lesson/chat - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        logToFile("Error: Missing prompt in request body");
        return res.status(400).json({ error: "Missing prompt" });
      }

      if (!initAI()) {
        logToFile("Error: GEMINI_API_KEY / GOOGLE_API_KEY not set");
        return res.status(500).json({ error: "Gemini API key is missing on the server." });
      }

      const promptText = `
        SYSTEM: You are a helpful teaching assistant for Basim Alkhalil Digital Academy. Answer in the language the student asks in (Arabic or English).
        
        USER QUESTION:
        CONTEXT:
        ${context}
        
        PROMPT:
        ${prompt}
      `;

      const result = await callAiWithRetry({
        contents: [
          { role: 'user', parts: [{ text: promptText }] }
        ]
      });
      
      const text = result.text || "";
      if (!text) {
        throw new Error("Empty response from AI");
      }

      logToFile("SUCCESS /api/lesson/chat - Response generated");
      res.json({ text });
    } catch (error: any) {
      const errDetail = error.message || JSON.stringify(error);
      logToFile(`Lesson Chat Error: ${errDetail}`);
      res.status(500).json({ error: typeof errDetail === 'string' ? errDetail : "Internal Error" });
    }
  });

  // New endpoint for generating lesson content
  app.post("/api/lesson/generate", async (req, res) => {
    logToFile(`START /api/lesson/generate - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { category, level, topic } = req.body;
      if (!topic) return res.status(400).json({ error: "Missing topic" });

      if (!initAI()) {
        logToFile("Error: GEMINI_API_KEY / GOOGLE_API_KEY not set");
        return res.status(500).json({ error: "Gemini API key is missing on the server. Please check your account settings." });
      }

      const promptText = `
        SYSTEM: Generate educational content in JSON matching the requested structure.
        
        USER REQUEST:
        Topic: "${topic}".
        Category: ${category}
        Level: ${level}
        
        Task: Create a deep, high-quality interactive lesson with specialized sections.
        
        Output JSON STRICTLY following this schema:
        {
          "title": "Topic Title",
          "titleAr": "العنوان بالعربية",
          "warmup": {
            "mission": "Mission statement",
            "missionAr": "بيان المهمة",
            "objectives": ["Obj 1", "Obj 2"],
            "objectivesAr": ["هدف 1", "هدف 2"]
          },
          "content": "Detailed markdown overview in English",
          "contentAr": "محتوى مفصل بالعربية بتنسيق مارك داون",
          "readingText": {
            "paragraphs": [
              { "en": "English paragraph text", "ar": "الترجمة العربية للفقرة" }
            ]
          },
          "vocabulary": [
            { "word": "Word", "phonetic": "fə-NET-ik", "meaningAr": "المعنى", "example": "Sentence example" }
          ],
          "imageryPrompt": "DALL-E style prompt for lesson image",
          "exercises": [
            {
              "type": "fill",
              "instruction": "Complete the sentences",
              "instructionAr": "أكمل الجمل التالية",
              "items": [
                { "text": "The cat ___ on the mat.", "textAr": "القطة ___ على السجادة.", "answer": "sat" }
              ]
            }
          ],
          "quiz": [
            {
              "question": "Question text",
              "questionAr": "نص السؤال",
              "options": ["A", "B", "C", "D"],
              "optionsAr": ["أ", "ب", "ج", "د"],
              "correctIndex": 0,
              "explanation": "Why it's correct",
              "explanationAr": "سبب صحة الإجابة"
            }
          ]
        }
        
        Ensure everything is in BOTH English and Professional Academic Arabic.
        For the readingText, provide at least 2-3 substantial paragraphs.
      `;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = result.text || "";
      if (!text) {
        logToFile("Empty result from AI generator");
        throw new Error("Empty response from AI generator");
      }
      
      let cleanText = text.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      
      try {
        const textToParse = cleanText;
        let parsed;
        try {
          parsed = JSON.parse(textToParse);
        } catch (e) {
          // Robust extraction if standard parse fails
          const arrayStart = textToParse.indexOf('[');
          const objectStart = textToParse.indexOf('{');
          const startIdx = (arrayStart !== -1 && (objectStart === -1 || arrayStart < objectStart)) ? arrayStart : objectStart;
          
          if (startIdx !== -1) {
            const endChar = (textToParse[startIdx] === '[') ? ']' : '}';
            const endIdx = textToParse.lastIndexOf(endChar);
            if (endIdx > startIdx) {
              parsed = JSON.parse(textToParse.substring(startIdx, endIdx + 1));
            } else {
              throw e;
            }
          } else {
            throw e;
          }
        }
        res.json(parsed);
      } catch (parseErr: any) {
        logToFile(`JSON Parse Error: ${parseErr.message}`);
        res.status(500).json({ 
          error: "Failed to parse AI response as JSON", 
          raw: cleanText.substring(0, 500) 
        });
      }
    } catch (error: any) {
      logToFile(`Lesson Generation Fatal Error: ${error.message}`);
      res.status(500).json({ error: error.message || "Failed to generate lesson content" });
    }
  });

  // AI Language Partner Endpoint
  app.post("/api/ai-partner/chat", async (req, res) => {
    logToFile(`START /api/ai-partner/chat - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { prompt, history = [] } = req.body;
      const promptText = `
        SYSTEM: You are a professional Oxford English Language Partner at Basim Alkhalil Digital Academy. 
        Respond naturally to keep the conversation going. Keep your response relatively short and clear.
        Also, if this feels like a natural point to give feedback, provide a JSON-like summary [FEEDBACK] { "fluency": 0-100, "grammar": 0-100, "vocabulary": 0-100, "suggestions": ["..."] }
        
        USER MESSAGE: ${prompt}
      `;

      const result = await callAiWithRetry({
        contents: [
          ...(Array.isArray(history) ? history : []).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text || "" }]
          })).filter(m => m.parts[0].text),
          { role: 'user', parts: [{ text: promptText }] }
        ]
      });

      const text = result.text || "";
      if (!text) {
        logToFile("EMPTY result from Gemini");
        return res.status(500).json({ error: "AI returned an empty response." });
      }

      res.json({ text });
    } catch (error: any) {
      const errorDetail = error.message || JSON.stringify(error);
      logToFile(`AI Partner Chat Error: ${errorDetail}`);
      res.status(500).json({ error: typeof errorDetail === 'string' ? errorDetail : "Internal AI Error" });
    }
  });

  // Story generation endpoint
  app.post("/api/generate/story", async (req, res) => {
    logToFile(`START /api/generate/story - Body: ${JSON.stringify(req.body)}`);
    try {
      const { theme, context, lang } = req.body;
      const promptText = `You are a professional children's storyteller. Write a very short, fun story for a 3-5 year old.
      THEME: ${theme}. CONTEXT: ${context || 'None'}. 
      Use 3 simple paragraphs separated by '|'. Provide 3 matching emojis separated by ','.
      Format: Title: [Title]\nStory: [P1] | [P2] | [P3]\nEmojis: [E1], [E2], [E3]
      Language: ${lang === 'ar' ? 'Arabic' : 'English'}`;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }]
      });

      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      logToFile(`Story Generation Error: ${error.message}`);
      res.status(500).json({ error: error.message || "Failed to generate story" });
    }
  });

  // Analysis endpoint for parent dashboard
  app.post("/api/admin/analyze", async (req, res) => {
    logToFile(`START /api/admin/analyze`);
    try {
      const { data, prompt, useJson = false } = req.body;
      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: `Analyze this data: ${JSON.stringify(data)}\n\nPrompt: ${prompt}` }] }],
        config: useJson ? { responseMimeType: "application/json" } : undefined
      });
      
      const text = result.text || "";
      res.json({ text });
    } catch (error: any) {
      logToFile(`Analysis Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });

  // Homework generation endpoint
  app.post("/api/homework/generate", async (req, res) => {
    logToFile(`START /api/homework/generate`);
    try {
      const { studentName, level, studentPerformance = [], lang } = req.body;
      const promptText = `
        SYSTEM: You are a Senior Pedagogy Expert at Basim Alkhalil academy.
        TASK: Generate a personalized "Smart Homework" for a student.
        DATA: Name: ${studentName}, Level: ${level}, Performance: ${JSON.stringify(studentPerformance)}.
        
        FORMAT: Return a JSON object:
        {
          "title": "Homework Title",
          "titleAr": "عنوان الواجب",
          "description": "Brief context description",
          "descriptionAr": "وصف سياق موجز",
          "tasks": [
            {
              "id": "t1",
              "type": "writing",
              "instruction": "Write a short paragraph about...",
              "instructionAr": "اكتب فقرة قصيرة عن...",
              "points": 50
            },
            {
              "id": "t2",
              "type": "reading",
              "instruction": "Read the following text and summarize it...",
              "instructionAr": "اقرأ النص التالي وقم بتلخيصه...",
              "content": "Text to read...",
              "contentAr": "النص المراد قراءته...",
              "points": 30
            }
          ],
          "deadline": "24 hours"
        }
        
        Language: High-quality ${lang === 'ar' ? 'Arabic' : 'English'}.
      `;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });

      const text = result.text || "";
      let cleanText = text || "{}";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      logToFile(`Homework Generation Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });

  // Curriculum Design Suggestion Endpoint
  app.post("/api/curriculum/design", async (req, res) => {
    logToFile(`START /api/curriculum/design`);
    try {
      const { subject, goals, lang } = req.body;
      const promptText = `
        SYSTEM: You are a Curriculum Architect at Basim Alkhalil Academy.
        TASK: Suggest a 6-level curriculum structure for a new subject: "${subject}".
        GOALS: ${goals}
        
        FORMAT: Return a JSON object with 6 levels (A1 to C2). 
        Each level should have 5 units.
        JSON format: { "A1": [ { "id": "...", "title": "...", "titleAr": "...", "description": "...", "descriptionAr": "..." }, ... ], ... }
        
        Language: High-quality ${lang === 'ar' ? 'Arabic' : 'English'}.
      `;

      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });

      const text = result.text || "";
      let cleanText = text || "{}";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      logToFile(`Curriculum Design Error: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  });

  // Video Quiz Generator
  app.post("/api/generate/video-quiz", async (req, res) => {
    try {
      const { videoTitle, level, lang } = req.body;
      const prompt = `Generate 3 multiple choice questions for: "${videoTitle}". Level: ${level}. JSON array format. Language: ${lang}`;
      const promptText = `Generate 3 multiple choice questions for: "${videoTitle}". Level: ${level}. JSON array format. Language: ${lang}`;
      const result = await callAiWithRetry({
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: { responseMimeType: "application/json" }
      });
      
      const text = result.text || "";
      let cleanText = text || "[]";
      if (cleanText.trim().startsWith("```")) {
        cleanText = cleanText.trim().replace(/^```json\n?/, "").replace(/\n?```$/, "");
      }
      res.json(JSON.parse(cleanText));
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Quiz generation failed" });
    }
  });

    // WebSocket for Live Audio Chat (Experimental)
    wss.on("connection", async (clientWs, req) => {
      const clientIp = req.socket.remoteAddress;
      logToFile(`New WebSocket Client connected from ${clientIp}`);
      let session: any = null;
      let isConnecting = false;
  
      clientWs.on("message", async (data) => {
        try {
          const msg = JSON.parse(data.toString());
          
          // Start session on first message (which should contain context)
          if (!session && !isConnecting) {
            isConnecting = true;
            const modelToUse = "gemini-3.1-flash-live-preview"; 
            logToFile(`Initializing Gemini Live session: ${modelToUse}`);

      if (!initAI()) {
        logToFile("ERROR: GEMINI_API_KEY missing");
        clientWs.send(JSON.stringify({ error: "Server API key configuration error." }));
        isConnecting = false;
        return;
      }

            try {
              const contextText = msg.context || `General tutoring at Basim Alkhalil Academy.`;
              logToFile(`Connecting to Gemini Live... Context: ${contextText.substring(0, 50)}`);
              
              session = await aiLive.live.connect({
                model: modelToUse,
                callbacks: {
                  onmessage: (message: any) => {
                    // Extract model audio
                    const audioContent = message.serverContent?.modelTurn?.parts?.[0]?.inlineData;
                    if (audioContent?.data) {
                      clientWs.send(JSON.stringify({ audio: audioContent.data }));
                    }
                    
                    // Handle interruptions
                    if (message.serverContent?.interrupted) {
                      clientWs.send(JSON.stringify({ interrupted: true }));
                    }
                    
                    // Handle model transcription
                    const modelText = message.serverContent?.modelTurn?.parts?.[0]?.text;
                    if (modelText) {
                      clientWs.send(JSON.stringify({ text: modelText }));
                    }
                    
                    // Handle user transcription
                    const userText = message.serverContent?.userTurn?.parts?.[0]?.text;
                    if (userText) {
                      clientWs.send(JSON.stringify({ userText }));
                    }

                    // Log activity occasionally
                    if (audioContent?.data || modelText || userText) {
                      logToFile(`Gemini Response - Audio: ${!!audioContent?.data}, Text: ${!!modelText}, UserText: ${!!userText}`);
                    }
                  },
                  onclose: () => {
                    logToFile(`Gemini Live session closed for ${clientIp}`);
                    if (clientWs.readyState === 1) { // OPEN
                      clientWs.close();
                    }
                  },
                  onerror: (err: any) => {
                    const errMsg = err?.message || err?.toString() || "Unknown Gemini error";
                    logToFile(`Gemini Live ONERROR: ${errMsg}`);
                    clientWs.send(JSON.stringify({ error: "The voice assistant encountered a technical issue." }));
                  }
                },
                config: {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
                  },
                  outputAudioTranscription: {},
                  inputAudioTranscription: {},
                  systemInstruction: `You are the Official AI Teaching Assistant for Basim Alkhalil Digital Academy.
                    Current context: ${contextText}
                    Persona: Professional, encouraging private tutor.
                    Language: ALWAYS match the student's language. If they speak Arabic, use Arabic. If English, use English.
                    Tone: Concise and suitable for audio conversation.`,
                },
              });

              isConnecting = false;
              logToFile(`Gemini Live Session Successfully Established for ${clientIp}`);
              clientWs.send(JSON.stringify({ status: 'ready' }));
            } catch (err: any) {
              isConnecting = false;
              const errMsg = err.message || "Failed to establish Gemini connection";
              logToFile(`Gemini Live connection FATAL ERROR: ${errMsg}`);
              console.error("Gemini Live Connection Error:", err);
              clientWs.send(JSON.stringify({ error: `Connection failed: ${errMsg}` }));
            }
            return;
          }

          // Relay audio/text if session is active
          if (session) {
            if (msg.audio) {
              session.sendRealtimeInput({
                audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
              });
            } else if (msg.text) {
              session.sendRealtimeInput({ text: msg.text });
            }
          }
        } catch (err: any) {
          logToFile(`WebSocket message processing error: ${err.message}`);
        }
      });

      clientWs.on("error", (err) => {
        logToFile(`WebSocket Client Error (${clientIp}): ${err.message}`);
      });

      clientWs.on("close", () => {
        logToFile(`WebSocket Client Disconnected (${clientIp})`);
        if (session) {
          try {
            session.close();
          } catch (e) {}
        }
      });
    });

  // 404 for API routes
  app.all("/api/*", (req, res) => {
    logToFile(`API 404 HIT: ${req.method} ${req.path} (Full URL: ${req.originalUrl})`);
    res.status(404).json({ 
      error: `API route not found`,
      method: req.method,
      path: req.path
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
