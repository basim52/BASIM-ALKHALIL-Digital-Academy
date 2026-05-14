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
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
        'Referer': 'https://basim-alkhalil-digital-academy.vercel.app/',
        'Origin': 'https://basim-alkhalil-digital-academy.vercel.app/'
      }
    }
  });
};

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
    
    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ role: 'user', parts: [{ text: `CONTEXT:\n${context}\n\nUSER QUESTION:\n${prompt}` }] }],
      config: {
        systemInstruction: "You are a helpful teaching assistant for Basim Alkhalil Digital Academy.",
      }
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate" });
  }
});

// Language partner
app.post("/api/ai-partner/chat", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    
    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [
        ...(Array.isArray(history) ? history : []).map((m: any) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "You are an Oxford English Language Partner.",
      }
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    console.error("Partner Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate" });
  }
});

// AI Analysis
app.post("/api/admin/analyze", async (req, res) => {
  try {
    const { data } = req.body;
    
    const ai = getAI();
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: [{ 
        role: 'user', 
        parts: [{ 
          text: `As an expert Academy Director, analyze this platform data:\n${JSON.stringify(data)}\nProvide a Markdown report.` 
        }] 
      }],
      config: {
        systemInstruction: "You are Basim Alkhalil, the Academy Director.",
      }
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
