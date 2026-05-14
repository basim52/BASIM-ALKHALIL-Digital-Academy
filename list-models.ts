import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function listModels() {
  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!);
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).listModels();
    console.log(JSON.stringify(models, null, 2));
  } catch (e: any) {
    console.error("Error listing models:", e.message);
  }
}

listModels();
