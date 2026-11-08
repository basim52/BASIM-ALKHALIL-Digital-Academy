export type Stage = 'explain' | 'answer' | 'correct' | 'review_one' | 'review_two';
export type Speaker = 'badr' | 'reem' | 'sara';
export type Message = { speaker: Speaker | 'abboud'; text: string };
export type Reply = {
  verdict: 'accurate' | 'inaccurate' | 'off_topic';
  turns: { speaker: Speaker; text: string }[];
  misconception?: { incorrect: string; correct: string; reason: string };
};
export type BoardFocus = { text: string; speaker: 'badr' | 'reem' };
export type TeacherRequest = { sessionId: number; teacherSpeech: string; history: Message[] } & (
  | { stage: Stage }
  | { stage: 'board'; boardFocus: BoardFocus }
);
const stages: Stage[] = ['explain', 'answer', 'correct', 'review_one', 'review_two'];
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function shortText(value: unknown, max = 1200): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}
export function isStage(value: unknown): value is Stage { return stages.some(stage => stage === value); }
function isSpeaker(value: unknown): value is Speaker { return value === 'badr' || value === 'reem' || value === 'sara'; }
export function parseRequest(value: unknown): TeacherRequest {
  if (!object(value) || typeof value.sessionId !== 'number' || !Number.isInteger(value.sessionId) || value.sessionId < 1 || value.sessionId > 5 || !(isStage(value.stage) || value.stage === 'board') || !shortText(value.teacherSpeech) || !Array.isArray(value.history) || value.history.length > 30) throw new Error('INVALID_REQUEST');
  if (value.sessionId !== 5 && (value.stage === 'review_one' || value.stage === 'review_two')) throw new Error('INVALID_REVIEW_STAGE');
  const history: Message[] = value.history.map(item => {
    if (!object(item) || !(isSpeaker(item.speaker) || item.speaker === 'abboud') || !shortText(item.text)) throw new Error('INVALID_HISTORY');
    return { speaker: item.speaker, text: item.text };
  });
  if (value.stage !== 'explain' && history.length === 0) throw new Error('MISSING_CONTEXT');
  const common = { sessionId: value.sessionId, teacherSpeech: value.teacherSpeech.trim(), history };
  if (value.stage === 'board') {
    const focus = value.boardFocus;
    if (!object(focus) || !shortText(focus.text, 200) || (focus.speaker !== 'badr' && focus.speaker !== 'reem') || !value.teacherSpeech.includes(focus.text) || !history.some(m => m.speaker === 'abboud' && m.text === common.teacherSpeech)) throw new Error('INVALID_BOARD_FOCUS');
    return { ...common, stage: 'board', boardFocus: { text: focus.text, speaker: focus.speaker } };
  }
  return { ...common, stage: value.stage };
}
export function parseReply(value: unknown, stage: Stage | 'board', boardSpeaker?: BoardFocus['speaker']): Reply {
  if (!object(value) || !['accurate', 'inaccurate', 'off_topic'].includes(String(value.verdict)) || !Array.isArray(value.turns) || value.turns.length < 1 || value.turns.length > 3) throw new Error('INVALID_AI_RESPONSE');
  const verdict = value.verdict;
  if (verdict !== 'accurate' && verdict !== 'inaccurate' && verdict !== 'off_topic') throw new Error('INVALID_VERDICT');
  const turns = value.turns.map(item => {
    if (!object(item) || !isSpeaker(item.speaker) || !shortText(item.text, 500)) throw new Error('INVALID_TURN');
    return { speaker: item.speaker, text: item.text.trim() };
  });
  const expected: Record<Stage, Speaker[]> = { explain: ['badr'], answer: ['badr', 'reem'], correct: ['reem', 'sara'], review_one: ['badr'], review_two: ['reem', 'sara'] };
  const speakers = verdict === 'accurate' ? (stage === 'board' ? [boardSpeaker] : expected[stage]) : ['sara'];
  if (turns.length !== speakers.length || turns.some((turn, i) => turn.speaker !== speakers[i])) throw new Error('INVALID_SPEAKER_SEQUENCE');
  if (stage === 'answer' && verdict === 'accurate') {
    const m = value.misconception;
    if (!object(m) || !shortText(m.incorrect, 200) || !shortText(m.correct, 200) || !shortText(m.reason, 500) || m.incorrect === m.correct) throw new Error('INVALID_MISCONCEPTION');
    const { incorrect } = m;
    if (!turns.some(t => t.speaker === 'reem' && t.text.includes(incorrect))) throw new Error('MISSING_MISTAKE');
    return { verdict, turns, misconception: { incorrect: m.incorrect, correct: m.correct, reason: m.reason } };
  }
  return { verdict, turns };
}
export function nextStage(stage: Stage, sessionId: number, verdict: Reply['verdict']): Stage | 'complete' {
  if (verdict !== 'accurate') return stage;
  switch (stage) {
    case 'explain': return 'answer';
    case 'answer': return 'correct';
    case 'correct': return sessionId === 5 ? 'review_one' : 'complete';
    case 'review_one': return 'review_two';
    case 'review_two': return 'complete';
  }
}
export function readCompleted(storage: Pick<Storage, 'getItem'>, uid?: string): number[] {
  if (!uid) return [];
  try {
    const data: unknown = JSON.parse(storage.getItem(`abboud-classroom:v2:${uid}`) || '[]');
    return Array.isArray(data) ? [...new Set(data.filter((n): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 5))] : [];
  } catch { return []; }
}
export function completeLesson(storage: Pick<Storage, 'getItem' | 'setItem'>, uid: string | undefined, sessionId: number): number[] {
  const completed = [...new Set([...readCompleted(storage, uid), sessionId])];
  if (uid) try { storage.setItem(`abboud-classroom:v2:${uid}`, JSON.stringify(completed)); } catch { /* Activity works without persistence. */ }
  return completed;
}
