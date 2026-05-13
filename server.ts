import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GoogleGenAI, Modality } from "@google/genai";
import "dotenv/config";

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
  const wss = new WebSocketServer({ server, path: '/live' });
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Regular Chat Endpoint for Lessons
  app.post("/api/lesson/chat", async (req, res) => {
    try {
      const { prompt, history, context } = req.body;
      
      let aiResponse = "";
      const maxRetries = 3;

      for (let i = 0; i <= maxRetries; i++) {
        try {
          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
              { role: 'user', parts: [{ text: `CONTEXT:\n${context}\n\nUSER QUESTION:\n${prompt}` }] }
            ],
            config: {
              systemInstruction: "You are a helpful teaching assistant for Basim Alkhalil Digital Academy. You are currently helping a student with a specific lesson. Answer questions ONLY related to the lesson context provided. Be encouraging, professional, and clear. Answer in the language the student asks in (Arabic or English).",
            }
          });
          aiResponse = response.text || "";
          break;
        } catch (error: any) {
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

      res.json({ text: aiResponse });
    } catch (error) {
      console.error("Lesson Chat Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // WebSocket for Live Audio Chat (Experimental)
  wss.on("connection", async (clientWs) => {
    console.log("New Live API connection");
    let session: any = null;

    clientWs.on("message", async (data) => {
      try {
        const msg = JSON.parse(data.toString());
        
      // Start session on first message
      if (!session) {
        try {
          const contextText = msg.context || `General help at Basim Alkhalil Academy.`;
          session = await ai.live.connect({
            model: "gemini-3.1-flash-live-preview",
            callbacks: {
              onmessage: (message: any) => {
                const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                if (audio) clientWs.send(JSON.stringify({ audio }));
                
                // Handle interruptions
                if (message.serverContent?.interrupted) {
                  clientWs.send(JSON.stringify({ interrupted: true }));
                }
                
                // Handle transcription for UI display
                const transcription = message.serverContent?.modelTurn?.parts[0]?.text;
                if (transcription) clientWs.send(JSON.stringify({ text: transcription }));
                
                // Also handle user transcription if enabled
                const userTranscription = message.serverContent?.userTurn?.parts[0]?.text;
                if (userTranscription) clientWs.send(JSON.stringify({ userText: userTranscription }));
              },
              onclose: () => {
                console.log("Gemini Live session closed");
              },
              onerror: (err: any) => {
                console.error("Gemini Live session error:", err);
                clientWs.send(JSON.stringify({ error: "Voice assistant encountered an error." }));
              }
            },
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
              },
              // Enable transcription
              outputAudioTranscription: {},
              inputAudioTranscription: {},
              systemInstruction: `You are a live audio teaching assistant for Basim Alkhalil Digital Academy. 
              Help the student with this lesson context: ${contextText}. 
              Be concise, spoken-friendly, and maintain the persona of a helpful private tutor.
              ALWAYS respond in the language the student uses. If they speak Arabic, respond in Arabic. If English, respond in English.`,
            },
          });
          clientWs.send(JSON.stringify({ status: 'ready' }));
        } catch (err) {
          console.error("Failed to connect to Gemini Live:", err);
          clientWs.send(JSON.stringify({ error: "Failed to start voice assistant." }));
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
