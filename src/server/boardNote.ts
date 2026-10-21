/** Pure helpers for /api/sara/board-note (tested by scripts/test-board-note.ts). */
export const NOTE_VOICES: Record<string, string> = { sara: "Kore", grammar: "Aoede", business: "Charon", exams: "Orus" };
export const cleanNoteInput = (v: unknown, max = 300) => String(v ?? "").replace(/📝/g, "").replace(/\s+/g, " ").trim().slice(0, max);
export const buildNotePrompt = (role: string, note: string, lesson: string) => `You are ${role}. An Arabic-speaking student wrote this note or question on the lesson whiteboard: """${note}"""
${lesson ? `Current lesson: ${lesson}\nAnswer in the context of this lesson.` : ""}
Reply in at most 2 short sentences (max 35 words). If the student wrote in Arabic, answer in simple Gulf-friendly Arabic with the English example; otherwise answer in simple English. If the note has an English mistake, give the corrected form. If it is not about learning English, kindly steer back to the lesson. No markdown, no emojis, no lists, Western digits only.`;
/** Thinking models can return no .text getter value; fall back to the candidate parts that are not thoughts. */
export const extractNoteAnswer = (r: any): string => {
  let t = "";
  try { t = String(r?.text ?? ""); } catch { t = ""; }
  if (!t.trim()) t = (r?.candidates?.[0]?.content?.parts || []).filter((p: any) => p && !p.thought && typeof p.text === "string").map((p: any) => p.text).join("");
  return t.replace(/[*_#`]/g, "").replace(/\s+/g, " ").trim().slice(0, 400);
};
export const NOTE_GEN_CONFIG = { maxOutputTokens: 1024, temperature: 0.4, thinkingConfig: { thinkingLevel: "low" as any } };
