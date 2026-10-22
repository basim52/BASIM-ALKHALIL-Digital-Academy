/**
 * Build step: Arabic UI string -> English dictionary (public/i18n/en.json) for the site-wide EN mode.
 * Incremental (keeps the committed file, translates only missing strings), time-boxed, never fails the build.
 * Lesson explanation texts are prefilled from public/lesson-en/all.json.
 */
import fs from "node:fs";
import path from "node:path";
import { GoogleGenAI, Type } from "@google/genai";
import { arabicStrings } from "./arabicStrings";
import { FOUNDATIONS_TRACK } from "../src/data/saraTracks/foundations";
import { ADVANCED_TRACK } from "../src/data/saraTracks/advanced";
import { CONVERSATION_TRACK } from "../src/data/saraTracks/conversation";
import { READING_TRACK } from "../src/data/saraTracks/reading";
import { WRITING_TRACK } from "../src/data/saraTracks/writing";
import { TUTOR_TRACKS } from "../src/data/tutorTracks";
import { lessonTextsForEnglish, lessonSig } from "../src/lib/lessonEnglishKeys";

const OUT = path.resolve("public/i18n/en.json");
const DEADLINE = Date.now() + Number(process.env.PRETRANSLATE_UI_BUDGET_MS || 25 * 60 * 1000);
const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];

async function main() {
  const all = arabicStrings();
  let dict: Record<string, string> = {};
  try { dict = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch { /* first run */ }
  try {
    const les = JSON.parse(fs.readFileSync("public/lesson-en/all.json", "utf8"));
    for (const t of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...TUTOR_TRACKS] as any[])
      for (const l of t.lessons) if (l.content) { const src = lessonTextsForEnglish(l); const e = les[l.id]; if (e && e.sig === lessonSig(src)) src.forEach((a, i) => { const k = a.trim(); if (k && e.texts[i] && !dict[k]) dict[k] = e.texts[i]; }); }
  } catch { /* ignore */ }
  const missing = all.filter(s => !dict[s]);
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
  console.log(`[pretranslate-ui] ${all.length} strings, ${all.length - missing.length} ready, ${missing.length} missing, key=${apiKey ? "yes" : "no"}`);
  if (missing.length && apiKey) {
    const ai = new GoogleGenAI({ apiKey });
    const schema = { type: Type.OBJECT, properties: { texts: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["texts"] };
    const batches: string[][] = []; let cur: string[] = []; let n = 0;
    for (const s of missing) { if (cur.length && (n + s.length > 6000 || cur.length >= 80)) { batches.push(cur); cur = []; n = 0; } cur.push(s); n += s.length; }
    if (cur.length) batches.push(cur);
    let next = 0, ok = 0;
    const worker = async () => {
      while (next < batches.length && Date.now() < DEADLINE) {
        const b = batches[next++];
        const prompt = `Translate each Arabic UI string of an English-learning academy website (buttons, labels, messages, lesson text) into natural, concise ENGLISH for the English version of the site. Keep emojis, numbers, punctuation, placeholders like ____ and any English words exactly. Keep it short like UI text. Some items are fragments of a longer sentence: translate the fragment only. The academy name is "Basim Al-Khalil Digital Academy"; teacher names: سارة=Sara, نورة=Noura, محمد=Mohammed, علي=Ali; فصل المعلمين=Teachers' Class. Return exactly ${b.length} items in the same order.\nInput JSON array:\n${JSON.stringify(b)}`;
        for (const model of MODELS) {
          try {
            const r = await ai.models.generateContent({ model, contents: [{ role: "user", parts: [{ text: prompt }] }], config: { responseMimeType: "application/json", responseSchema: schema as any, maxOutputTokens: 16000, temperature: 0.2 } });
            const res = JSON.parse((r.text || "").trim())?.texts;
            if (!Array.isArray(res) || res.length !== b.length) continue;
            b.forEach((s, i) => { const e = String(res[i] ?? "").trim(); if (e && !/[\u0600-\u06FF]/.test(e)) dict[s] = e; });
            ok++; break;
          } catch (e) { console.warn(`[pretranslate-ui] ${model}:`, String((e as any)?.message || e).slice(0, 100)); }
        }
      }
    };
    await Promise.all(Array.from({ length: 10 }, worker));
    console.log(`[pretranslate-ui] batches ok ${ok}/${batches.length}`);
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(dict));
  console.log(`[pretranslate-ui] dictionary ${Object.keys(dict).length} entries; still missing ${all.filter(s => !dict[s]).length}`);
}
main().then(() => process.exit(0), e => { console.warn("[pretranslate-ui] skipped:", String(e).slice(0, 200)); process.exit(0); });
