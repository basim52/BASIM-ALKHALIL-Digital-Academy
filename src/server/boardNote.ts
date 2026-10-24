/** Pure helpers for /api/sara/board-note (tested by scripts/test-board-note.ts). */
export const NOTE_VOICES: Record<string, string> = { sara: "Kore", grammar: "Aoede", business: "Charon", exams: "Orus", lama: "Achernar", reem: "Laomedeia", haya: "Vindemiatrix", jana: "Autonoe" };
export const cleanNoteInput = (v: unknown, max = 300) => String(v ?? "").replace(/📝/g, "").replace(/\s+/g, " ").trim().slice(0, max);
export const buildNotePrompt = (role: string, note: string, lesson: string, en = false) => `You are ${role}. An Arabic-speaking student wrote this note or question on the lesson whiteboard: """${note}"""
${lesson ? `Current lesson: ${lesson}\nAnswer in the context of this lesson.` : ""}
Reply in at most 2 short sentences (max 35 words). ${en ? "The student chose English explanations: answer ONLY in simple English, even if the note is in Arabic." : "If the student wrote in Arabic, answer in simple Gulf-friendly Arabic with the English example; otherwise answer in simple English."} If the note has an English mistake, give the corrected form. If it is not about learning English, kindly steer back to the lesson. No markdown, no emojis, no lists, Western digits only.`;
/** Thinking models can return no .text getter value; fall back to the candidate parts that are not thoughts. */
export const extractNoteAnswer = (r: any, max = 400): string => {
  let t = "";
  try { t = String(r?.text ?? ""); } catch { t = ""; }
  if (!t.trim()) t = (r?.candidates?.[0]?.content?.parts || []).filter((p: any) => p && !p.thought && typeof p.text === "string").map((p: any) => p.text).join("");
  return t.replace(/[*_#`]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
};
export const NOTE_GEN_CONFIG = { maxOutputTokens: 1024, temperature: 0.4, thinkingConfig: { thinkingLevel: "low" as any } };

/** Student image on the board (data URL, already downscaled client-side). Returns null when not an accepted image. */
export const IMAGE_MAX_B64 = 1_600_000; // ~1.2 MB JPEG
export const parseBoardImage = (v: unknown): { mimeType: string; data: string } | null => {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(v ?? ""));
  if (!m || m[2].length > IMAGE_MAX_B64) return null;
  return { mimeType: m[1], data: m[2] };
};
export const buildImagePrompt = (role: string, note: string, lesson: string, en = false) => `You are ${role}. An Arabic-speaking student put this image on the lesson whiteboard (for example a photo of a textbook page, worksheet, or exercise) and wants you to explain it.
${lesson ? `Current lesson: ${lesson}\nConnect your explanation to this lesson where it fits.` : ""}${note ? `\nThe student also wrote: """${note}"""` : ""}
Read the image carefully (including any English text). Explain what it shows and the key English point in at most 4 short sentences (max 70 words), like a teacher writing on the board: what it is, the main rule or meaning, and one example or the answer to a visible exercise. ${en ? "The student chose English explanations: answer ONLY in simple English." : "Answer in simple Gulf-friendly Arabic, keeping the English words and examples in English."} If the image is unreadable or not related to learning, say so kindly in one sentence and ask for a clearer photo of the lesson. No markdown, no emojis, no lists, Western digits only.`;
