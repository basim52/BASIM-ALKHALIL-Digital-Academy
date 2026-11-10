import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { SOCRATIC_CHAT, SOCRATIC_SPOKEN, SOCRATIC_NOTE } from "../src/server/socratic";
import { buildNotePrompt } from "../src/server/boardNote";

const routes = readFileSync(new URL("../src/server/routes.ts", import.meta.url), "utf8");

test("each method block covers the core Socratic rules", () => {
  for (const block of [SOCRATIC_CHAT, SOCRATIC_SPOKEN, SOCRATIC_NOTE]) assert.match(block, /ONE/);
  for (const block of [SOCRATIC_CHAT, SOCRATIC_SPOKEN]) {
    assert.match(block, /hint/i);
    assert.match(block, /2 (wrong )?tries/);
    assert.match(block, /review/i);
  }
  assert.match(SOCRATIC_CHAT, /new topic/);
});

test("board-note answers from every teacher end with one question", () => {
  for (const who of ["Sara", "Noura", "Mohammed", "Ali", "Lama", "Reem", "Haya", "Jana"]) {
    const p = buildNotePrompt(who, "what is the past of go?", "Past simple");
    assert.ok(p.includes(SOCRATIC_NOTE) && p.startsWith(`You are ${who}.`));
    assert.ok(buildNotePrompt(who, "x", "", true).includes("ONLY in simple English"), "English mode kept");
  }
});

test("Sara's chat uses the method", () => {
  const sara = routes.slice(routes.indexOf('app.post("/api/sara/chat"'), routes.indexOf('app.post("/api/placement/save"'));
  assert.ok(sara.includes("${SOCRATIC_CHAT}"));
});

test("only specialty tutor conversations get it; Sara's phone call and free talk stay unchanged", () => {
  const call = routes.slice(routes.indexOf('app.post("/api/sara/call-turn"'), routes.indexOf('app.post("/api/sara/call-review"'));
  assert.ok(call.includes('${tutor && !free ? `\\n${SOCRATIC_SPOKEN}` : ""}'));
  assert.equal(call.split("SOCRATIC_").length - 1, 1, "no other Socratic text in the call prompt");
});

test("Abboud's classroom (Badr and Reem) is untouched", () => {
  const abboud = readFileSync(new URL("../src/server/abboudTeacher.ts", import.meta.url), "utf8");
  assert.ok(!abboud.includes("SOCRATIC"));
});
