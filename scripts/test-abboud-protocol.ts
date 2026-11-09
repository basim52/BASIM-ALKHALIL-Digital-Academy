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

test('curriculum: every fixed lesson has reviewed words (English, Arabic meaning, emoji), an Arabic rule and Arabic-glossed examples', async () => {
  const { SESSIONS_CONFIG, customLesson } = await import('../src/lib/abboud/curriculum');
  assert.equal(SESSIONS_CONFIG.length, 15);
  for (const lesson of SESSIONS_CONFIG) {
    assert.ok(lesson.words.length >= 2, `L${lesson.id} words`);
    for (const w of lesson.words) {
      assert.match(w.en, /^[A-Za-z][A-Za-z ?!',]*$/, `L${lesson.id} English word ${w.en}`);
      assert.match(w.ar, /[\u0600-\u06FF]/, `L${lesson.id} Arabic meaning of ${w.en}`); assert.ok(w.emoji.trim(), `L${lesson.id} emoji of ${w.en}`);
    }
    assert.deepEqual(lesson.chalkTargetWords, lesson.words.map(w => w.en), 'board words are exactly the lesson targets the AI checks');
    assert.match(lesson.ruleAr, /[\u0600-\u06FF]/); assert.ok(lesson.examples.length >= 2, `L${lesson.id} examples`);
    for (const e of lesson.examples) { assert.match(e.en, /^[A-Za-z]/); assert.match(e.ar, /[\u0600-\u06FF]/); }
  }
  const custom = customLesson('الفضاء');
  assert.deepEqual([custom.words, custom.examples, custom.ruleAr], [[], [], ''], 'a chosen topic gets no invented content');
});

test('lesson items are marked only by whole words Abboud says, with a small speech-recognition tolerance', async () => {
  const { saysItem, coveredItems, englishTokens } = await import('../src/lib/abboud/lessonBoard');
  const { SESSIONS_CONFIG } = await import('../src/lib/abboud/curriculum');
  assert.deepEqual(englishTokens("What's 2 + ٣?"), ['what', 'is', 'two', 'three']);
  assert.equal(saysItem('I have two books', 'two books'), true);
  assert.equal(saysItem('I have 2 books', 'two books'), true, 'digits count as the number word');
  assert.equal(saysItem('the apples are red', 'apple'), true, 'plural of the item');
  assert.equal(saysItem('this is yelow', 'yellow'), true, 'one letter off in a long word (recognition slip)');
  assert.equal(saysItem("what's your name", 'What is your name?'), true);
  assert.equal(saysItem('I am bored', 'red'), false, 'no substring matches');
  assert.equal(saysItem('tennis is fun', 'ten'), false);
  assert.equal(saysItem('rad', 'red'), false, 'short words must be exact');
  assert.equal(saysItem('book red', 'a red book'), false, 'words must be in order');
  assert.equal(saysItem('هلو ماي نيم', 'Hello'), false, 'Arabic-letter transliteration is not counted');
  assert.equal(saysItem('On Friday I visits my grandmother', 'On Friday I visit my grandmother.'), true);
  assert.equal(saysItem('Friday grandmother', 'On Friday I visit my grandmother.'), false);
  const colours = SESSIONS_CONFIG[1];
  assert.deepEqual(coveredItems(colours, ['Red means أحمر', 'and this is a red book']), ['w0', 'w4', 'e0']);
  assert.deepEqual(coveredItems(colours, []), []);
});

test('board writes the full lesson on top (title, words + meanings, rule, examples), progress counts, dialogue below', async () => {
  const { abboudBoardActions, abboudBoardCalls } = await import('../src/lib/abboud/board');
  const { SESSIONS_CONFIG, customLesson } = await import('../src/lib/abboud/curriculum');
  const empty = { source: '', checked: false, correction: null, responses: [] };
  for (const lesson of SESSIONS_CONFIG) {
    const written = JSON.stringify(abboudBoardCalls({ ...empty, lesson, lessonTitle: `${lesson.emoji} ${lesson.titleAr}` }));
    for (const w of lesson.words) { assert.ok(written.includes(w.en), `L${lesson.id} ${w.en}`); assert.ok(written.includes(w.ar), `L${lesson.id} ${w.ar}`); }
    for (const e of lesson.examples) { assert.ok(written.includes(e.en)); assert.ok(written.includes(e.ar)); }
    assert.ok(written.includes(lesson.ruleAr)); assert.ok(written.includes(`شرحت 0 من ${lesson.words.length + lesson.examples.length}`));
    assert.equal(/(\\n|")✅ /.test(written), false, `L${lesson.id}: nothing marked before Abboud speaks (only the ✅ legend)`);
    assert.ok(written.includes('✅ = تم شرحها'));
    assert.equal(written.includes('عبود:'), false);
  }
  const colours = SESSIONS_CONFIG[1];
  const actions = abboudBoardActions({ ...empty, lesson: colours, lessonTitle: '🎨 الألوان', explained: ['w0', 'e0'], source: 'Red. A red book.', checked: false,
    responses: [{ speaker: 'reem', text: 'Is it blue?' }] });
  const texts = actions.map(a => JSON.stringify(a));
  assert.deepEqual(actions[0], { kind: 'title', text: '🎨 الألوان' });
  assert.match(texts[1], /شرحت 2 من 10/);
  assert.match(texts[2], /✅ 🔴 red — أحمر/); assert.match(texts[2], /▫️ 🔵 blue — أزرق/);
  assert.ok(texts.some(t => t.includes('✅ a red book')) && texts.some(t => t.includes('"a blue bag"')));
  const divider = texts.findIndex(t => t.includes('💬 من الحصة'));
  const lastLesson = texts.findIndex(t => t.includes('a yellow pencil'));
  assert.ok(lastLesson > 0 && divider > lastLesson, 'lesson reference first, the dialogue below it');
  assert.ok(texts.findIndex(t => t.includes('عبود: Red. A red book.')) > divider && texts.findIndex(t => t.includes('Is it blue?')) > divider);
  const custom = abboudBoardActions({ ...empty, lesson: customLesson('الفضاء'), lessonTitle: '✨ الفضاء', abboudSpeech: ['The moon and the stars', 'القمر'] });
  const customText = JSON.stringify(custom);
  assert.match(customText, /لا يوجد محتوى جاهز مُراجَع/); assert.match(customText, /كلمات إنجليزية قلتها: the, moon, and, stars/);
  assert.equal(customText.includes('شرحت'), false, 'no fake progress for a chosen topic');
});
