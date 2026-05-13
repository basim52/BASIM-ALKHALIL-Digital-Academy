import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GoogleGenAI, Modality } from "@google/genai";
import "dotenv/config";
import fs from "fs";

// Log function to a file for persistent debugging
const logFile = path.join(process.cwd(), 'server-debug.log');
function logToFile(msg: string) {
  const timestamp = new Date().toISOString();
  try {
    fs.appendFileSync(logFile, `[${timestamp}] ${msg}\n`);
  } catch (e) {}
}

logToFile("Server process initializing...");
logToFile(`GEMINI_API_KEY present: ${!!process.env.GEMINI_API_KEY}`);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ noServer: true });
  const PORT = 3000;

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

  // Request logger
  app.use((req, res, next) => {
    logToFile(`${req.method} ${req.path}`);
    next();
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    logToFile("Health check requested");
    res.json({ 
      status: "ok", 
      geminiKeySet: !!process.env.GEMINI_API_KEY,
      isProduction: process.env.NODE_ENV === "production",
      time: new Date().toISOString()
    });
  });

  app.get("/api/test-get", (req, res) => {
    logToFile("Test GET requested");
    res.json({ message: "GET request successful" });
  });

  // Regular Chat Endpoint for Lessons
  app.post("/api/lesson/chat", async (req, res) => {
    logToFile(`START /api/lesson/chat - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        logToFile("Error: Missing prompt in request body");
        return res.status(400).json({ error: "Missing prompt" });
      }

      if (!process.env.GEMINI_API_KEY) {
        logToFile("Error: GEMINI_API_KEY not set");
        return res.status(500).json({ error: "Gemini API key is missing on server" });
      }

      let aiResponse = "";
      const maxRetries = 3;

      for (let i = 0; i <= maxRetries; i++) {
        try {
          const result = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
              { role: 'user', parts: [{ text: `CONTEXT:\n${context}\n\nUSER QUESTION:\n${prompt}` }] }
            ],
            config: {
              systemInstruction: "You are a helpful teaching assistant for Basim Alkhalil Digital Academy. You are currently helping a student with a specific lesson. Answer questions ONLY related to the lesson context provided. Be encouraging, professional, and clear. Answer in the language the student asks in (Arabic or English).",
            }
          });
          aiResponse = result.text || "";
          break;
        } catch (error: any) {
          logToFile(`Retry ${i} failed for lesson chat: ${error.message}`);
          if (i === maxRetries) throw error;
          const isOverloaded = error.message?.includes('503') || 
                              error.message?.includes('429') || 
                              error.message?.includes('UNAVAILABLE') ||
                              error.status === 503 ||
                              error.status === 429;
          
          if (isOverloaded) {
            await new Promise(r => setTimeout(r, 2000 * (i + 1)));
            continue;
          }
          throw error;
        }
      }

      logToFile("SUCCESS /api/lesson/chat - Response generated");
      res.json({ text: aiResponse });
    } catch (error: any) {
      logToFile(`Lesson Chat Error: ${error.message}`);
      console.error("Lesson Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  // AI Language Partner Endpoint
  app.post("/api/ai-partner/chat", async (req, res) => {
    logToFile(`START /api/ai-partner/chat - Body keys: ${Object.keys(req.body || {})}`);
    try {
      const { prompt, history = [] } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        logToFile("Error: GEMINI_API_KEY not set");
        return res.status(500).json({ error: "Gemini API key is missing on server" });
      }
      
      const systemInstruction = `
        You are an Oxford English Language Partner at Basim Alkhalil Digital Academy. 
        Respond naturally to keep the conversation going. Keep your response relatively short and clear (suitable for a learner).
        Also, if this feels like a natural point to give feedback (e.g. after a few exchanges), provide a JSON-like summary of their English skills in this EXACT format:
        [FEEDBACK]
        {
          "fluency": 0-100,
          "grammar": 0-100,
          "vocabulary": 0-100,
          "suggestions": ["short suggestion 1", "short suggestion 2"]
        }
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...(Array.isArray(history) ? history : []).map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction,
        }
      });

      logToFile("SUCCESS /api/ai-partner/chat - Response generated");
      res.json({ text: result.text || "" });
    } catch (error: any) {
      logToFile(`AI Partner Chat Error: ${error.message}`);
      console.error("AI Partner Chat Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

    // WebSocket for Live Audio Chat (Experimental)
    wss.on("connection", async (clientWs, req) => {
      logToFile(`New WebSocket Client connected from ${req.socket.remoteAddress}`);
      let session: any = null;
      let isConnecting = false;
  
      clientWs.on("message", async (data) => {
        try {
          const msg = JSON.parse(data.toString());
          
          // Start session on first message
          if (!session && !isConnecting) {
            isConnecting = true;
            const modelToUse = "gemini-3.1-flash-live-preview"; 
            logToFile(`Starting Gemini Live session with model: ${modelToUse}...`);
            try {
              const contextText = msg.context || `General help at Basim Alkhalil Academy.`;
              logToFile(`Attempting ai.live.connect with model ${modelToUse} and context: ${contextText.substring(0, 50)}...`);
              
              if (!process.env.GEMINI_API_KEY) {
                throw new Error("GEMINI_API_KEY is not set on the server.");
              }

              session = await ai.live.connect({
                model: modelToUse,
                callbacks: {
                  onmessage: (message: any) => {
                    logToFile(`Gemini message type: ${Object.keys(message)}`);
                    const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                    if (audio) {
                      clientWs.send(JSON.stringify({ audio }));
                    }
                    
                    // Handle interruptions
                    if (message.serverContent?.interrupted) {
                      clientWs.send(JSON.stringify({ interrupted: true }));
                    }
                    
                    // Handle transcription for UI display
                    const transcription = message.serverContent?.modelTurn?.parts?.[0]?.text;
                    if (transcription) clientWs.send(JSON.stringify({ text: transcription }));
                    
                    // Also handle user transcription if enabled
                    const userText = message.serverContent?.userTurn?.parts?.[0]?.text;
                    if (userText) clientWs.send(JSON.stringify({ userText }));
                  },
                  onclose: () => {
                    logToFile("Gemini Live session closed");
                    clientWs.close();
                  },
                  onerror: (err: any) => {
                    logToFile(`Gemini Live error callback: ${err.message || err.toString()}`);
                    clientWs.send(JSON.stringify({ error: "Voice assistant encountered a problem." }));
                  }
                },
                config: {
                  responseModalities: [Modality.AUDIO],
                  speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
                  },
                  outputAudioTranscription: {},
                  inputAudioTranscription: {},
                  systemInstruction: `You are a live audio teaching assistant for Basim Alkhalil Digital Academy. 
                    Help the student with this lesson context: ${contextText}. 
                    Be concise, spoken-friendly, and maintain the persona of a helpful private tutor.
                    ALWAYS respond in the language the student uses. If they speak Arabic, respond in Arabic. If English, respond in English.`,
                },
              });
              isConnecting = false;
              logToFile("Gemini Live session connection successful");
              clientWs.send(JSON.stringify({ status: 'ready' }));
            } catch (err: any) {
              isConnecting = false;
              logToFile(`Gemini Live connection catch error: ${err.message}`);
              clientWs.send(JSON.stringify({ error: `Failed to start voice assistant: ${err.message}` }));
            }
          return;
        }

        if (session && msg.audio) {
          session.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: "audio/pcm;rate=16000" },
          });
        }

        if (session && msg.text) {
          session.sendRealtimeInput({ text: msg.text });
        }

      } catch (err) {
        console.error("Live WebSocket Error:", err);
      }
    });

    clientWs.on("close", () => {
      if (session) session.close();
      console.log("Live API connection closed");
    });
  });

  // 404 for API routes
  app.use("/api/*", (req, res) => {
    logToFile(`API 404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: `API route ${req.method} ${req.originalUrl} not found` });
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
