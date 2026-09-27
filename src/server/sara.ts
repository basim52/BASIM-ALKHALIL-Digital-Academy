import { Type } from "@google/genai";

export interface SaraStudent {
  name?: string;
  age?: number;
  level?: string;
  placementResult?: string;
  interests?: string[];
}

// REAL student-facing section ids (must match views in AuthenticatedApp.tsx and AppView union)
export const SARA_SECTIONS = [
  { id: "grammar-academy", ar: "القواعد الأكاديمية" },
  { id: "reading-lab", ar: "مختبر القراءة" },
  { id: "writing-spelling-studio", ar: "استوديو الكتابة والإملاء" },
  { id: "pronunciation-lab", ar: "مختبر النطق" },
  { id: "interactive-learning", ar: "التعلم التفاعلي" },
  { id: "educational-games", ar: "الألعاب التعليمية" },
  { id: "story-library", ar: "مكتبة القصص" },
  { id: "video-library", ar: "مكتبة الفيديو" },
  { id: "live-translate", ar: "الترجمة المباشرة" },
  { id: "early-childhood", ar: "الطفولة المبكرة" },
  { id: "placement-test", ar: "اختبار التحديد" },
  { id: "flashcards-hub", ar: "مركز البطاقات التعليمية" },
  { id: "english-songs", ar: "الأغاني الإنجليزية" },
];

export function buildSaraSystemPrompt(student: SaraStudent): string {
  const { name, age, level, placementResult, interests } = student;
  return `
You are Sara (سارة), a friendly, energetic young English teacher from the Gulf, teaching a child/teen on the BASIM ALKHALIL Digital Academy. You are an AI teacher; if asked, say you are an AI teacher named Sara. You teach ENGLISH only.
Explain in simple Gulf-friendly Arabic (خليجي بسيط) plus the English words/sentences being learned; unknown/beginner level = mostly Arabic with short English; use more English as the level improves. Learning content (board.sentence, quiz) is always English.
Warm and encouraging, 2–4 short sentences, at most one emoji, always end with ONE simple question or task.
Praise the attempt, model the correct sentence, fill board.correction {wrong, right}; never shame.
Always kid-safe: stay on English learning; gently redirect off-topic/inappropriate topics back to English; NEVER ask for personal info (full name, address, phone, school name, photos, passwords, social media); if the student shares such info, kindly tell them not to share it and do not repeat it; if the student seems upset or mentions something unsafe, respond kindly and suggest talking to a parent or trusted adult.
If age or level is unknown, ask age, then interests, then goal — one question per message — in the first messages; if level/placementResult is known, use it and don't ask.
Session flow (~10–15 min): warm-up → quick review → ONE new skill (use board.title/sentence/highlight) → practice (may suggest ONE academy section via actions) → 3-question mini quiz, one question per message via board.quiz, waiting for each answer → summary + one tiny homework, then sessionDone=true.
You may only suggest sections from the following whitelist (id + Arabic name):
${SARA_SECTIONS.map(s => `- ${s.id} (${s.ar})`).join("\n")}
Actions may only be {"type":"open_section","sectionId":<one of these ids>}.
Respond with ONLY a JSON object {reply, board?, actions?, sessionDone?} where board = {title?, sentence?, highlight?, correction?: {wrong, right}, quiz?: {question, options[2-4], answerIndex}}, actions = [{type: "open_section", sectionId}], sessionDone = true only at the end of the session..
Student snapshot: JSON of { name, age, level, placementResult, interests } where missing values are the string "unknown".
${JSON.stringify({ name: name || "unknown", age: age || "unknown", level: level || "unknown", placementResult: placementResult || "unknown", interests: interests || "unknown" })}
  `.trim();
}

export const saraResponseSchema = {
  type: Type.OBJECT,
  properties: {
    reply: { type: Type.STRING },
    board: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        sentence: { type: Type.STRING },
        highlight: { type: Type.STRING },
        correction: {
          type: Type.OBJECT,
          properties: {
            wrong: { type: Type.STRING },
            right: { type: Type.STRING }
          },
          required: ["wrong", "right"]
        },
        quiz: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            answerIndex: { type: Type.INTEGER }
          },
          required: ["question", "options", "answerIndex"]
        }
      }
    },
    actions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          sectionId: { type: Type.STRING }
        },
        required: ["type", "sectionId"]
      }
    },
    sessionDone: { type: Type.BOOLEAN }
  },
  required: ["reply"]
};

export function sanitizeSaraInput(body: any): { message: string; history: Array<{ role: "user" | "model"; text: string }>; student: SaraStudent | any } | string {
  // Validate message
  if (!body.message || typeof body.message !== "string" || body.message.trim() === "" || body.message.length > 1000) {
    return "Invalid message";
  }
  const message = body.message.trim();

  // Validate history
  let history: Array<{ role: "user" | "model"; text: string }> = [];
  if (Array.isArray(body.history)) {
    history = body.history
      .filter(
        (h: any) =>
          h &&
          typeof h === "object" &&
          (h.role === "user" || h.role === "model") &&
          typeof h.text === "string" &&
          h.text.length <= 1000
      )
      .map((h: any) => ({
        role: h.role,
        text: h.text.trim(),
      }))
      // Keep last 12
      .slice(-12);
  }

  // Validate student snapshot
  const student: any = {};
  if (body.student && typeof body.student === "object") {
    if (body.student.name && typeof body.student.name === "string") {
      student.name = body.student.name.trim().slice(0, 100);
    }
    if (body.student.age !== undefined && typeof body.student.age === "number" && body.student.age >= 3 && body.student.age <= 99) {
      student.age = body.student.age;
    }
    if (body.student.level && typeof body.student.level === "string") {
      student.level = body.student.level.trim().slice(0, 100);
    }
    if (body.student.placementResult && typeof body.student.placementResult === "string") {
      student.placementResult = body.student.placementResult.trim().slice(0, 100);
    }
    if (Array.isArray(body.student.interests)) {
      student.interests = body.student.interests
        .filter((i: any) => typeof i === "string")
        .map((i: string) => i.trim().slice(0, 40))
        .slice(0, 5);
    }
  }

  return { message, history, student };
}

const rateLimitMap = new Map<string, { day: string; count: number }>();

export function checkSaraRateLimit(uid: string): boolean {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const record = rateLimitMap.get(uid);
  if (!record || record.day !== today) {
    rateLimitMap.set(uid, { day: today, count: 1 });
    return true;
  }
  if (record.count >= 40) {
    return false;
  }
  record.count += 1;
  return true;
}

export function parseSaraReply(rawText: string): any {
  try {
    // Strip markdown code fences if present
    let jsonStr = rawText.trim();
    if (jsonStr.startsWith("```json")) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.endsWith("```")) {
      jsonStr = jsonStr.slice(0, -3);
    }
    jsonStr = jsonStr.trim();

    const parsed = JSON.parse(jsonStr);

    // Validate top-level
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Not an object");
    }

    // Validate reply
    if (typeof parsed.reply !== "string") {
      throw new Error("Invalid reply");
    }
    // Trim reply to 2000 chars
    parsed.reply = parsed.reply.slice(0, 2000);

    // Validate board if present
    if (parsed.board !== undefined) {
      if (typeof parsed.board !== "object" || parsed.board === null) {
        delete parsed.board;
      } else {
        // Ensure title, sentence, highlight are strings if present
        if (parsed.board.title !== undefined && typeof parsed.board.title !== "string") {
          delete parsed.board.title;
        }
        if (parsed.board.sentence !== undefined && typeof parsed.board.sentence !== "string") {
          delete parsed.board.sentence;
        }
        if (parsed.board.highlight !== undefined && typeof parsed.board.highlight !== "string") {
          delete parsed.board.highlight;
        }
        // Validate correction
        if (parsed.board.correction !== undefined) {
          if (
            typeof parsed.board.correction !== "object" ||
            parsed.board.correction === null ||
            typeof parsed.board.correction.wrong !== "string" ||
            typeof parsed.board.correction.right !== "string"
          ) {
            delete parsed.board.correction;
          }
        }
        // Validate quiz
        if (parsed.board.quiz !== undefined) {
          if (
            typeof parsed.board.quiz !== "object" ||
            parsed.board.quiz === null ||
            typeof parsed.board.quiz.question !== "string" ||
            !Array.isArray(parsed.board.quiz.options) ||
            parsed.board.quiz.options.length < 2 ||
            parsed.board.quiz.options.length > 4 ||
            !parsed.board.quiz.options.every((opt: any) => typeof opt === "string") ||
            typeof parsed.board.quiz.answerIndex !== "number" ||
            parsed.board.quiz.answerIndex < 0 ||
            parsed.board.quiz.answerIndex >= parsed.board.quiz.options.length
          ) {
            delete parsed.board.quiz;
          } else {
            // Ensure options are strings and trimmed
            parsed.board.quiz.options = parsed.board.quiz.options
              .map((opt: string) => opt.trim())
              .filter((opt: string) => opt.length > 0);
          }
        }
      }
    }

    // Validate actions
    if (parsed.actions !== undefined) {
      if (!Array.isArray(parsed.actions)) {
        delete parsed.actions;
      } else {
        parsed.actions = parsed.actions
          .filter(
            (action: any) =>
              action &&
              typeof action === "object" &&
              action.type === "open_section" &&
              typeof action.sectionId === "string" &&
              SARA_SECTIONS.some((s) => s.id === action.sectionId)
          )
          // Keep max 2
          .slice(0, 2);
      }
    }

    // Validate sessionDone
    if (parsed.sessionDone !== undefined && typeof parsed.sessionDone !== "boolean") {
      delete parsed.sessionDone;
    }

    // Build the result object with only the allowed fields
    const result: { reply: string; board?: any; actions?: any[]; sessionDone?: boolean } = {
      reply: parsed.reply
    };

    // Conditionally add board if it exists and has at least one field
    if (parsed.board !== undefined && parsed.board !== null && typeof parsed.board === "object") {
      // Check if board has any of the expected properties
      const boardKeys = Object.keys(parsed.board);
      if (boardKeys.length > 0) {
        result.board = parsed.board;
      }
    }

    // Conditionally add actions if it exists and is a non-empty array
    if (parsed.actions !== undefined && Array.isArray(parsed.actions) && parsed.actions.length > 0) {
      result.actions = parsed.actions;
    }

    // Conditionally add sessionDone if it exists and is a boolean
    if (parsed.sessionDone !== undefined && typeof parsed.sessionDone === "boolean") {
      result.sessionDone = parsed.sessionDone;
    }

    return result;
  } catch (e) {
    // Fallback
    const fallbackReply =
      rawText.trim().length > 0 && !rawText.trim().startsWith("{")
        ? rawText.trim().slice(0, 2000)
        : "عذراً، حدث خطأ. دعونا نحاول مرة أخرى.";
    return { reply: fallbackReply };
  }
}