import { CUSTOM_LESSON_ID, LAST_LESSON_ID, REVIEW_LESSON_ID } from './curriculum.js';
import { sanitizeTopic } from './topic.js';

export type Stage = 'explain' | 'answer' | 'correct' | 'review_one' | 'review_two';
export type Speaker = 'badr' | 'reem' | 'sara';
export type Student = 'badr' | 'reem';
export type Message = { speaker: Speaker | 'abboud'; text: string };
/** The controlled beginner error a student makes for Abboud to catch; `speaker` is derived from the lesson, not from the AI. */
export type Misconception = { incorrect: string; correct: string; reason: string; speaker: Student };
/** Badr names the idea he understood; it must be Abboud's own words (grounds the explanation star). */
export type Understood = { speaker: 'badr'; concept: string };
/** Sara's closing note: one specific thing Abboud said well (quoted from him) + exactly one tip. */
export type Praise = { quote: string; strength: string; tip: string };
export type Reply = {
  verdict: 'accurate' | 'inaccurate' | 'off_topic';
  turns: { speaker: Speaker; text: string }[];
  misconception?: Misconception;
  understood?: Understood;
  praise?: Praise;
};
export type BoardFocus = { text: string; speaker: Student };
export type TeacherRequest = { sessionId: number; teacherSpeech: string; history: Message[]; customTopic?: string } & (
  | { stage: Stage }
  | { stage: 'board'; boardFocus: BoardFocus }
);
/** What the validator knows besides the reply: the lesson, the board's chosen student, and everything Abboud actually said. */
export type ReplyContext = { sessionId?: number; boardSpeaker?: Student; abboudSpeech?: readonly string[] };
const stages: Stage[] = ['explain', 'answer', 'correct', 'review_one', 'review_two'];
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function shortText(value: unknown, max = 1200): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}
export function isStage(value: unknown): value is Stage { return stages.some(stage => stage === value); }
function isSpeaker(value: unknown): value is Speaker { return value === 'badr' || value === 'reem' || value === 'sara'; }
const validSession = (id: unknown): id is number => typeof id === 'number' && Number.isInteger(id) && id >= 1 && (id <= LAST_LESSON_ID || id === CUSTOM_LESSON_ID);
/** One controlled error per lesson, alternating students: Reem in odd lessons, Badr in even ones. */
export function mistakeSpeaker(sessionId: number): Student { return sessionId % 2 === 0 ? 'badr' : 'reem'; }

export function parseRequest(value: unknown): TeacherRequest {
  if (!object(value) || !validSession(value.sessionId) || !(isStage(value.stage) || value.stage === 'board') || !shortText(value.teacherSpeech) || !Array.isArray(value.history) || value.history.length > 30) throw new Error('INVALID_REQUEST');
  if (value.sessionId !== REVIEW_LESSON_ID && (value.stage === 'review_one' || value.stage === 'review_two')) throw new Error('INVALID_REVIEW_STAGE');
  let customTopic: string | undefined;
  if (value.sessionId === CUSTOM_LESSON_ID) {
    const topic = sanitizeTopic(value.customTopic);
    if (topic.ok === false || topic.topic !== value.customTopic) throw new Error('INVALID_TOPIC');
    customTopic = topic.topic;
  }
  const history: Message[] = value.history.map(item => {
    if (!object(item) || !(isSpeaker(item.speaker) || item.speaker === 'abboud') || !shortText(item.text)) throw new Error('INVALID_HISTORY');
    return { speaker: item.speaker, text: item.text };
  });
  if (value.stage !== 'explain' && history.length === 0) throw new Error('MISSING_CONTEXT');
  const common = { sessionId: value.sessionId, teacherSpeech: value.teacherSpeech.trim(), history, ...(customTopic ? { customTopic } : {}) };
  if (value.stage === 'board') {
    const focus = value.boardFocus;
    if (!object(focus) || !shortText(focus.text, 200) || (focus.speaker !== 'badr' && focus.speaker !== 'reem') || !value.teacherSpeech.includes(focus.text) || !history.some(m => m.speaker === 'abboud' && m.text === common.teacherSpeech)) throw new Error('INVALID_BOARD_FOCUS');
    return { ...common, stage: 'board', boardFocus: { text: focus.text, speaker: focus.speaker } };
  }
  return { ...common, stage: value.stage };
}
/** Case/diacritic/punctuation-insensitive whole-word containment, used to ground claims in what was really said. */
export function fold(text: string) {
  return text.normalize('NFKC').toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}']+/gu, ' ').trim();
}
export function saysPhrase(text: string, phrase: string) {
  const needle = fold(phrase);
  return needle.length >= 2 && ` ${fold(text)} `.includes(` ${needle} `);
}
const fromAbboud = (phrase: string, speech: readonly string[]) => speech.some(said => saysPhrase(said, phrase));
function singleSentence(text: string) { return !/[.!?؟\n]/.test(text.trim().replace(/[.!?؟]+$/, '')); }
export function praiseLine(praise: Praise) { return `${praise.strength} قلتَ: «${praise.quote}». نصيحة واحدة: ${praise.tip}`; }
export function completesLesson(stage: Stage | 'board', sessionId: number) {
  return stage !== 'board' && nextStage(stage, sessionId, 'accurate') === 'complete';
}
function expectedSpeakers(stage: Stage | 'board', sessionId: number, boardSpeaker?: Student): (Speaker | undefined)[] {
  const erring = mistakeSpeaker(sessionId);
  switch (stage) {
    case 'board': return [boardSpeaker];
    case 'explain': return ['badr'];
    // Badr acknowledges; the lesson's erring student applies the idea with ONE controlled error (Badr does both when it's his turn to err).
    case 'answer': return erring === 'reem' ? ['badr', 'reem'] : ['badr'];
    case 'correct': return [erring, 'sara'];
    case 'review_one': return ['badr'];
    case 'review_two': return ['reem', 'sara'];
  }
}
export function parseReply(value: unknown, stage: Stage | 'board', context: ReplyContext = {}): Reply {
  const { sessionId = 1, boardSpeaker, abboudSpeech = [] } = context;
  if (!object(value) || !['accurate', 'inaccurate', 'off_topic'].includes(String(value.verdict)) || !Array.isArray(value.turns) || value.turns.length < 1 || value.turns.length > 3) throw new Error('INVALID_AI_RESPONSE');
  const verdict = value.verdict;
  if (verdict !== 'accurate' && verdict !== 'inaccurate' && verdict !== 'off_topic') throw new Error('INVALID_VERDICT');
  const turns = value.turns.map(item => {
    if (!object(item) || !isSpeaker(item.speaker) || !shortText(item.text, 500)) throw new Error('INVALID_TURN');
    return { speaker: item.speaker, text: item.text.trim() };
  });
  const speakers = verdict === 'accurate' ? expectedSpeakers(stage, sessionId, boardSpeaker) : ['sara'];
  if (turns.length !== speakers.length || turns.some((turn, i) => turn.speaker !== speakers[i])) throw new Error('INVALID_SPEAKER_SEQUENCE');
  if (verdict !== 'accurate') return { verdict, turns };
  const reply: Reply = { verdict, turns };
  if (stage === 'answer') {
    const m = value.misconception;
    if (!object(m) || !shortText(m.incorrect, 200) || !shortText(m.correct, 200) || !shortText(m.reason, 500) || m.incorrect === m.correct) throw new Error('INVALID_MISCONCEPTION');
    const speaker = mistakeSpeaker(sessionId); const { incorrect } = m;
    if (!turns.some(t => t.speaker === speaker && t.text.includes(incorrect))) throw new Error('MISSING_MISTAKE');
    reply.misconception = { incorrect: m.incorrect, correct: m.correct, reason: m.reason, speaker };
    // Optional evidence of understanding: kept only if it is Abboud's own words and Badr actually says it. Never a fabricated star.
    const u = value.understood;
    if (object(u) && u.speaker === 'badr' && shortText(u.concept, 120) && fromAbboud(u.concept, abboudSpeech) && saysPhrase(turns[0].text, u.concept)) reply.understood = { speaker: 'badr', concept: u.concept.trim() };
  }
  if (completesLesson(stage, sessionId)) {
    // Sara's closing praise must quote what Abboud really said and give one tip; otherwise it is dropped, not invented.
    const p = value.praise;
    if (object(p) && shortText(p.quote, 120) && shortText(p.strength, 160) && shortText(p.tip, 160) && singleSentence(p.tip) && fromAbboud(p.quote, abboudSpeech)) {
      reply.praise = { quote: p.quote.trim(), strength: p.strength.trim(), tip: p.tip.trim() };
      const last = turns.length - 1;
      turns[last] = { speaker: 'sara', text: praiseLine(reply.praise) };
    }
  }
  return reply;
}
export function nextStage(stage: Stage, sessionId: number, verdict: Reply['verdict']): Stage | 'complete' {
  if (verdict !== 'accurate') return stage;
  switch (stage) {
    case 'explain': return 'answer';
    case 'answer': return 'correct';
    case 'correct': return sessionId === REVIEW_LESSON_ID ? 'review_one' : 'complete';
    case 'review_one': return 'review_two';
    case 'review_two': return 'complete';
  }
}
/** Fixed lessons completed by this student on this device (custom lessons are not tracked here). */
export function readCompleted(storage: Pick<Storage, 'getItem'>, uid?: string): number[] {
  if (!uid) return [];
  try {
    const data: unknown = JSON.parse(storage.getItem(`abboud-classroom:v2:${uid}`) || '[]');
    return Array.isArray(data) ? [...new Set(data.filter((n): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= LAST_LESSON_ID))] : [];
  } catch { return []; }
}
export function completeLesson(storage: Pick<Storage, 'getItem' | 'setItem'>, uid: string | undefined, sessionId: number): number[] {
  if (sessionId < 1 || sessionId > LAST_LESSON_ID) return readCompleted(storage, uid);
  const completed = [...new Set([...readCompleted(storage, uid), sessionId])];
  if (uid) try { storage.setItem(`abboud-classroom:v2:${uid}`, JSON.stringify(completed)); } catch { /* Activity works without persistence. */ }
  return completed;
}
