import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import { completeLesson, nextStage, parseReply, parseRequest, readCompleted } from '../src/lib/abboud/protocol';
import { abboudTeacherHandler } from '../src/server/abboudTeacher';

const explanation = { sessionId: 1, stage: 'explain', teacherSpeech: 'Hello is a greeting', history: [] };
const reply = { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'When can I say hello?' }] };
test('request rejects invalid, oversized, or context-free payloads', () => {
  assert.equal(parseRequest(explanation).teacherSpeech, explanation.teacherSpeech);
  for (const change of [{ teacherSpeech: '' }, { teacherSpeech: 'x'.repeat(1201) }, { sessionId: 17 }, { sessionId: 16 }, { sessionId: 0 }, { sessionId: 1.5 }, { stage: 'invented' }, { stage: 'correct' }, { stage: 'review_one', sessionId: 1 }, { history: Array(31).fill({ speaker: 'sara', text: 'x' }) }]) {
    assert.throws(() => parseRequest({ ...explanation, ...change }));
  }
});
test('no fabricated success from malformed AI, absent fields or invalid speaker order', () => {
  assert.deepEqual(parseReply(reply, 'explain'), reply);
  for (const value of [{}, { isFallback: true }, { ...reply, turns: [] }, { ...reply, turns: [{ speaker: 'sara', text: 'Great' }] }, { ...reply, verdict: 'maybe' }]) assert.throws(() => parseReply(value, 'explain'));
  assert.throws(() => parseReply({ verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Yes' }, { speaker: 'reem', text: 'Hello' }] }, 'answer'));
});
test('controlled error requires distinct correction and exact Reem utterance', () => {
  const result = { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Thanks' }, { speaker: 'reem', text: 'I say a book red!' }], misconception: { incorrect: 'a book red', correct: 'a red book', reason: 'Color before noun' } };
  assert.equal(parseReply(result, 'answer').misconception?.correct, 'a red book');
  assert.throws(() => parseReply({ ...result, misconception: { ...result.misconception, incorrect: 'not said' } }, 'answer'));
});
test('wrong teaching retries; lesson 5 requires TWO teacher review questions', () => {
  assert.equal(nextStage('explain', 1, 'inaccurate'), 'explain');
  assert.equal(nextStage('answer', 1, 'off_topic'), 'answer');
  assert.equal(nextStage('correct', 1, 'inaccurate'), 'correct');
  assert.equal(nextStage('correct', 1, 'accurate'), 'complete');
  assert.equal(nextStage('correct', 5, 'accurate'), 'review_one');
  assert.equal(nextStage('review_one', 5, 'accurate'), 'review_two');
  assert.equal(nextStage('review_two', 5, 'accurate'), 'complete');
});
test('progress isolated per student, guests not stored, replay idempotent, corrupt data safe', () => {
  const data = new Map<string, string>();
  const storage = { getItem: (key: string) => data.get(key) || null, setItem: (key: string, value: string) => { data.set(key, value); } };
  completeLesson(storage, 'a', 1); completeLesson(storage, 'a', 1); completeLesson(storage, 'b', 2);
  assert.deepEqual(readCompleted(storage, 'a'), [1]); assert.deepEqual(readCompleted(storage, 'b'), [2]);
  const size = data.size; completeLesson(storage, undefined, 3); assert.equal(data.size, size);
  data.set('abboud-classroom:v2:a', '[1,1,16,"2",-1,null]'); assert.deepEqual(readCompleted(storage, 'a'), [1], 'custom lessons and junk never count');
  data.set('abboud-classroom:v2:a', '[6,15]'); assert.deepEqual(readCompleted(storage, 'a'), [6, 15], 'the ten new lessons are tracked');
  assert.deepEqual(completeLesson(storage, 'a', 16), [6, 15], 'a custom lesson does not enter the fixed-lesson progress');
  data.set('abboud-classroom:v2:a', '{'); assert.deepEqual(readCompleted(storage, 'a'), []);
});
test('HTTP handler forwards real dialogue, validates model output, and fails honestly', async () => {
  let mode = 'valid'; let received = '';
  const app = express(); app.use(express.json());
  app.post('/api/sara/abboud-teacher', abboudTeacherHandler(async (prompt, instruction) => {
    received = prompt; assert.match(instruction, /UNTRUSTED/);
    if (mode === 'unavailable') throw new Error('offline');
    return mode === 'malformed' ? '{"verdict":"accurate"}' : JSON.stringify(reply);
  }));
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address(); assert.ok(address && typeof address !== 'string');
  const url = `http://127.0.0.1:${address.port}/api/sara/abboud-teacher`;
  const post = (body: unknown) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    const ok = await post(explanation); assert.equal(ok.status, 200); assert.deepEqual(await ok.json(), reply); assert.match(received, /Hello is a greeting/); assert.equal(ok.headers.get('cache-control'), 'no-store');
    const invalid = await post({ ...explanation, teacherSpeech: '' }); assert.equal(invalid.status, 400);
    for (const fail of ['unavailable', 'malformed']) { mode = fail; const r = await post(explanation); assert.equal(r.status, fail === 'unavailable' ? 503 : 502); const body = await r.json(); assert.equal(body.error, fail === 'unavailable' ? 'AI_UNAVAILABLE' : 'AI_INVALID_RESPONSE'); assert.equal(body.verdict, undefined); }
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
});
test('board focus is anchored to actual teacher dialogue and cannot spoof another student', () => {
  const source = 'This is a red book and three pencils';
  const board = { sessionId: 2, stage: 'board', teacherSpeech: source, history: [{ speaker: 'abboud', text: source }], boardFocus: { text: 'red', speaker: 'reem' } };
  assert.equal(parseRequest(board).stage, 'board');
  assert.throws(() => parseRequest({ ...board, boardFocus: { text: 'blue', speaker: 'reem' } }));
  assert.throws(() => parseRequest({ ...board, boardFocus: { text: 'red', speaker: 'sara' } }));
  assert.throws(() => parseRequest({ ...board, history: [{ speaker: 'badr', text: source }] }));
  assert.equal(parseReply({ verdict: 'accurate', turns: [{ speaker: 'reem', text: 'red is the color of the book' }] }, 'board', { boardSpeaker: 'reem' }).turns.length, 1);
  assert.throws(() => parseReply({ verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Wrong speaker' }] }, 'board', { boardSpeaker: 'reem' }));
});
test('Abboud content becomes Sara board actions: only actual words, colours, quantities, gated correction', async () => {
  const { boardTokens, abboudBoardActions, abboudBoardCalls, interactionError } = await import('../src/lib/abboud/board');
  assert.deepEqual(boardTokens('red three ٢ خمسة apples').map(t => [t.text, t.color || null, t.count || null]), [
    ['red', '#ef4444', null], ['three', null, 3], ['٢', null, 2], ['خمسة', null, 5], ['apples', null, null]
  ]);
  const base = { lessonTitle: '🎨 الألوان', source: '', checked: false, correction: null, responses: [] };
  assert.deepEqual(abboudBoardActions(base), [{ kind: 'title', text: '🎨 الألوان' }], 'empty board: lesson title only, no scripted content');
  const said = abboudBoardActions({ ...base, source: 'three red books' });
  assert.deepEqual(said.filter(a => a.kind === 'arrow'), [{ kind: 'arrow', from: 'three', to: '●●●' }, { kind: 'arrow', from: 'red', to: '🔴' }]);
  assert.ok(said.some(a => a.kind === 'text' && a.text.includes('three red books')));
  assert.equal(JSON.stringify(said).includes('blue'), false);
  const c = { incorrect: 'two book', correct: 'two books', reason: 'plural', speaker: 'reem' as const, accepted: false };
  const pending = abboudBoardCalls({ ...base, source: 'two books', correction: c });
  assert.equal(pending.some(a => a.tool === 'highlightError'), false, 'correct answer stays hidden until Abboud corrects');
  assert.ok(pending.some(a => a.tool === 'addNote' && a.payload.content.includes('بانتظار تصحيح عبود')));
  assert.ok(abboudBoardCalls({ ...base, source: 'two books', correction: { ...c, accepted: true } }).some(a => a.tool === 'highlightError' && a.payload.correctedSnippet === 'two books'));
  const replies = abboudBoardCalls({ ...base, source: 'red', responses: [{ speaker: 'badr', text: 'one' }, { speaker: 'reem', text: 'two' }, { speaker: 'badr', text: 'three' }] });
  assert.deepEqual(replies.filter(a => a.tool === 'addNote').map(a => a.tool === 'addNote' && a.payload.content), ['ريم: two', 'بدر: three']);
  assert.match(interactionError(500), /تعذّر تشغيله/); assert.match(interactionError(401), /سجّل الدخول/); assert.match(interactionError(429), /حد المؤقت/); assert.match(interactionError(502), /غير صالح/);
});
test('board HTTP interaction forwards focus only as user data and enforces the selected student', async () => {
  const app = express(); app.use(express.json());
  app.post('/api/sara/abboud-teacher', abboudTeacherHandler(async (prompt, instruction, schema) => {
    const input = JSON.parse(prompt);
    assert.equal(input.boardFocus.text, 'papaya'); assert.equal(instruction.includes('papaya'), false);
    assert.ok(schema.required?.includes('verdict'));
    return JSON.stringify({ verdict: 'accurate', turns: [{ speaker: 'reem', text: 'You like papaya.' }] });
  }));
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address(); assert.ok(address && typeof address !== 'string');
  try {
    const response = await fetch(`http://127.0.0.1:${address.port}/api/sara/abboud-teacher`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 4, stage: 'board', teacherSpeech: 'I like papaya', history: [{ speaker: 'abboud', text: 'I like papaya' }], boardFocus: { text: 'papaya', speaker: 'reem' } }) });
    assert.equal(response.status, 200); assert.equal((await response.json()).turns[0].speaker, 'reem');
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
});
