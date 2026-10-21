import assert from "node:assert/strict";
import { cleanNoteInput, buildNotePrompt, extractNoteAnswer, NOTE_VOICES, NOTE_GEN_CONFIG } from "../src/server/boardNote";
assert.equal(cleanNoteInput("📝  what is   the past of go? "), "what is the past of go?");
assert.equal(cleanNoteInput("📝"), "");
const p = buildNotePrompt("Noura", "why we say went?", "Past simple (الماضي)");
assert.ok(p.includes("why we say went?") && p.includes("Current lesson: Past simple"));
assert.equal(extractNoteAnswer({ text: "We say **went** because go is irregular." }), "We say went because go is irregular.");
// thinking model: .text empty, answer only in non-thought parts
assert.equal(extractNoteAnswer({ text: "", candidates: [{ content: { parts: [{ thought: true, text: "thinking..." }, { text: "Go becomes went." }] } }] }), "Go becomes went.");
assert.equal(extractNoteAnswer({ get text() { throw new Error("x"); }, candidates: [] }), "");
assert.deepEqual(Object.keys(NOTE_VOICES).sort(), ["business", "exams", "grammar", "sara"]);
assert.ok(NOTE_GEN_CONFIG.maxOutputTokens >= 1024, "room for thinking tokens");
console.log("board-note tests passed");
