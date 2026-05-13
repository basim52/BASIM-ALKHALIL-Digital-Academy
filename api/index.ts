import express from "express";
import { GoogleGenAI, Modality } from "@google/genai";
import "dotenv/config";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Root test route
app.get("/ping", (req, res) => {
  res.send("pong_from_api_folder");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    geminiKeySet: !!process.env.GEMINI_API_KEY,
    env: process.env.NODE_ENV || "not set",
    time: new Date().toISOString()
  });
});

// Chat Endpoints
app.post("/api/lesson/chat", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "API key missing" });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: `CONTEXT:\n${context}\n\nUSER QUESTION:\n${prompt}` }] }],
      config: {
        systemInstruction: "You are a helpful teaching assistant for Basim Alkhalil Digital Academy.",
      }
    });

    res.json({ text: result.text || "" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to generate" });
  }
});

// Language partner
app.post("/api/ai-partner/chat", async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "API key missing" });

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
        systemInstruction: "You are an Oxford English Language Partner.",
      }
    });

// AI Analysis
app.post("/api/admin/analyze", async (req, res) => {
  try {
    const { data } = req.body;
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: "API key missing" });

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
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

export default app;
