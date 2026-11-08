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
  for (const change of [{ teacherSpeech: '' }, { teacherSpeech: 'x'.repeat(1201) }, { sessionId: 6 }, { sessionId: 1.5 }, { stage: 'invented' }, { stage: 'correct' }, { stage: 'review_one', sessionId: 1 }, { history: Array(31).fill({ speaker: 'sara', text: 'x' }) }]) {
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
  data.set('abboud-classroom:v2:a', '[1,1,6,"2",-1,null]'); assert.deepEqual(readCompleted(storage, 'a'), [1]);
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
    for (const fail of ['unavailable', 'malformed']) { mode = fail; const r = await post(explanation); assert.equal(r.status, 503); const body = await r.json(); assert.equal(body.error, 'AI_UNAVAILABLE'); assert.equal(body.verdict, undefined); }
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); }
});
