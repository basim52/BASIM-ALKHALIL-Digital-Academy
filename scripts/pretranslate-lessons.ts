/**
 * Build step: English versions of every lesson's Arabic explanation texts -> public/lesson-en/all.json (served statically),
 * so the ع/EN switch is instant. Reuses the runtime cache (Firestore lessonEnglishCache, same keys as /api/lesson/english),
 * translates only what is missing, never fails the build (time-boxed; the server translation stays as fallback).
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { GoogleGenAI, Type } from "@google/genai";
import { FOUNDATIONS_TRACK } from "../src/data/saraTracks/foundations";
import { ADVANCED_TRACK } from "../src/data/saraTracks/advanced";
import { CONVERSATION_TRACK } from "../src/data/saraTracks/conversation";
import { READING_TRACK } from "../src/data/saraTracks/reading";
import { WRITING_TRACK } from "../src/data/saraTracks/writing";
import { TUTOR_TRACKS } from "../src/data/tutorTracks";
import { lessonTextsForEnglish, lessonSig } from "../src/lib/lessonEnglishKeys";
import { getAdminDb } from "../src/server/firebaseAdmin";

const OUT = path.resolve("public/lesson-en/all.json");
const DEADLINE = Date.now() + Number(process.env.PRETRANSLATE_BUDGET_MS || 9 * 60 * 1000);
const MODELS = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];
type Entry = { sig: string; texts: string[] };

async function main() {
  const lessons: { id: string; texts: string[] }[] = [];
  for (const t of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...TUTOR_TRACKS] as any[])
    for (const l of t.lessons) if (l.content) lessons.push({ id: l.id, texts: lessonTextsForEnglish(l) });
  let out: Record<string, Entry> = {};
  try { out = JSON.parse(fs.readFileSync(OUT, "utf8")); } catch { /* first run */ }
  const key = (id: string, texts: string[]) => `${id.replace(/[^A-Za-z0-9_.-]/g, "").slice(0, 120)}_${crypto.createHash("sha1").update(JSON.stringify(texts)).digest("hex").slice(0, 16)}`;
  let missing = lessons.filter(l => out[l.id]?.sig !== lessonSig(l.texts));
  const db = process.env.FIREBASE_SERVICE_ACCOUNT ? getAdminDb() : null;
  if (db && missing.length) {
    for (let i = 0; i < missing.length; i += 100) {
      const refs = missing.slice(i, i + 100).map(l => db.collection("lessonEnglishCache").doc(key(l.id, l.texts)));
      try { const docs = await db.getAll(...refs); docs.forEach((d, j) => { const l = missing[i + j]; const t = d.data()?.texts; if (Array.isArray(t) && t.length === l.texts.length) out[l.id] = { sig: lessonSig(l.texts), texts: t }; }); } catch (e) { console.warn("[pretranslate] cache read failed:", String(e).slice(0, 120)); break; }
    }
    missing = lessons.filter(l => out[l.id]?.sig !== lessonSig(l.texts));
  }
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_API_KEY || process.env.API_KEY;
  console.log(`[pretranslate] ${lessons.length} lessons, ${lessons.length - missing.length} ready, ${missing.length} to translate, key=${apiKey ? "yes" : "no"}`);
  if (missing.length && apiKey) {
    const ai = new GoogleGenAI({ apiKey });
    const schema = { type: Type.OBJECT, properties: { texts: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["texts"] };
    const batches: typeof missing[] = []; for (let i = 0; i < missing.length; i += 5) batches.push(missing.slice(i, i + 5));
    let next = 0;
    const worker = async () => {
      while (next < batches.length && Date.now() < DEADLINE) {
        const b = batches[next++]; const flat = b.flatMap(l => l.texts);
        const prompt = `You translate an English course for a young learner from Arabic explanations into simple, clear, natural ENGLISH (CEFR A2-B1 wording), keeping every English example, word or sentence exactly as written. Same meaning and teaching point, no extra content, no markdown, no emojis, Western digits only. Return exactly ${flat.length} items in the same order. Empty input stays empty.\nInput JSON array:\n${JSON.stringify(flat)}`;
        for (const model of MODELS) {
          try {
            const r = await ai.models.generateContent({ model, contents: [{ role: "user", parts: [{ text: prompt }] }], config: { responseMimeType: "application/json", responseSchema: schema as any, maxOutputTokens: 16000, temperature: 0.2 } });
            const res = JSON.parse((r.text || "").trim())?.texts;
            if (!Array.isArray(res) || res.length !== flat.length) continue;
            let k = 0;
            for (const l of b) {
              const t = l.texts.map((src, i) => src ? String(res[k + i] ?? "").replace(/[*_#`]/g, "").trim() : ""); k += l.texts.length;
              out[l.id] = { sig: lessonSig(l.texts), texts: t };
              void db?.collection("lessonEnglishCache").doc(key(l.id, l.texts)).set({ id: l.id, texts: t, at: Date.now() }).catch(() => {});
            }
            break;
          } catch (e) { console.warn(`[pretranslate] ${model}:`, String((e as any)?.message || e).slice(0, 120)); }
        }
      }
    };
    await Promise.all(Array.from({ length: 6 }, worker));
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out));
  const done = lessons.filter(l => out[l.id]?.sig === lessonSig(l.texts)).length;
  console.log(`[pretranslate] wrote ${done}/${lessons.length} lessons to ${OUT}`);
}
main().then(() => process.exit(0), e => { console.warn("[pretranslate] skipped:", String(e).slice(0, 200)); process.exit(0); });
