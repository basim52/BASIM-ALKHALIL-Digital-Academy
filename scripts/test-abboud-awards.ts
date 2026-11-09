import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { once } from 'node:events';
import { CUSTOM_LESSON_ID, LAST_LESSON_ID, SESSIONS_CONFIG, lessonFor } from '../src/lib/abboud/curriculum';
import { completesLesson, mistakeSpeaker, parseReply, parseRequest, praiseLine } from '../src/lib/abboud/protocol';
import { sanitizeTopic } from '../src/lib/abboud/topic';
import { awardStar, awardsKey, buildReport, correctionStar, earnedCertificate, readAwards, readReports, reportText, reportsKey, saveName, saveReport, shareText, starCount } from '../src/lib/abboud/awards';
import { drawCertificate } from '../src/lib/abboud/certificate';
import { abboudTeacherHandler } from '../src/server/abboudTeacher';

function memory() {
  const data = new Map<string, string>();
  return { data, storage: { getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => { data.set(k, v); } } };
}
test('15 short beginner lessons with the same structure; the original five keep their ids', () => {
  assert.equal(SESSIONS_CONFIG.length, LAST_LESSON_ID); assert.equal(LAST_LESSON_ID, 15);
  assert.deepEqual(SESSIONS_CONFIG.map(s => s.id), Array.from({ length: 15 }, (_, i) => i + 1));
  assert.deepEqual(SESSIONS_CONFIG.slice(0, 5).map(s => s.titleAr), ['التحية والتعريف', 'الألوان والأشياء', 'الأعداد 1–10', 'الجمل البسيطة', 'المراجعة وسؤالان']);
  assert.deepEqual(SESSIONS_CONFIG.slice(5).map(s => s.titleAr), ['الحيوانات', 'العائلة', 'الأكل والشرب', 'أجزاء الجسم', 'الملابس', 'الطقس', 'أيام الأسبوع', 'المدرسة', 'المشاعر', 'الأفعال اليومية']);
  for (const s of SESSIONS_CONFIG) {
    assert.ok(s.titleAr && s.titleEn && s.emoji && s.chalkRuleEn.length > 20 && s.chalkTargetWords.length >= 2, `lesson ${s.id} complete`);
    for (const word of s.chalkTargetWords) assert.match(word, /^[A-Za-z][A-Za-z ?']*$/, `plain English word: ${word}`);
  }
  // Spot-check the English rules taught to beginners.
  const rule = (id: number) => SESSIONS_CONFIG[id - 1].chalkRuleEn;
  assert.match(rule(6), /an elephant/); assert.match(rule(9), /foot becomes feet/); assert.match(rule(8), /drink milk/);
  assert.match(rule(12), /capital letter/); assert.match(rule(14), /I am happy/); assert.match(rule(15), /He plays/);
  assert.equal(lessonFor(CUSTOM_LESSON_ID), undefined, 'custom lesson needs a topic'); assert.equal(lessonFor(CUSTOM_LESSON_ID, 'الفضاء')?.titleAr, 'الفضاء');
});
test('topic of «درس من اختياري» is cleaned and unsuitable topics are refused gently', () => {
  assert.deepEqual(sanitizeTopic('  كرة   القدم '), { ok: true, topic: 'كرة القدم' }, '«القدم» is not «دم»');
  assert.deepEqual(sanitizeTopic('Animals'), { ok: true, topic: 'Animals' });
  assert.deepEqual(sanitizeTopic('الحيوانات'), { ok: true, topic: 'الحيوانات' });
  const markup = sanitizeTopic('<b>cats</b>'); assert.ok(markup.ok && !/[<>/]/.test(markup.topic));
  for (const bad of ['الحرب', 'guns', 'التدخين', 'Horror movies', 'بالسكين']) assert.deepEqual(sanitizeTopic(bad), { ok: false, reason: 'unsuitable' }, bad);
  assert.deepEqual(sanitizeTopic(''), { ok: false, reason: 'empty' }); assert.deepEqual(sanitizeTopic('🙂🙂'), { ok: false, reason: 'empty' });
  assert.deepEqual(sanitizeTopic('a'.repeat(41)), { ok: false, reason: 'too_long' });
  const request = { sessionId: CUSTOM_LESSON_ID, stage: 'explain', teacherSpeech: 'A ball', history: [], customTopic: 'كرة القدم' };
  assert.equal(parseRequest(request).customTopic, 'كرة القدم');
  for (const customTopic of [undefined, 'الحرب', '<b>cats</b>', 'x'.repeat(41)]) assert.throws(() => parseRequest({ ...request, customTopic }), String(customTopic));
  assert.equal(parseRequest({ ...request, sessionId: 2 }).customTopic, undefined, 'fixed lessons ignore a stray topic');
});
test('controlled errors alternate: Reem in odd lessons, Badr in even ones, always tied to the exact wrong words', () => {
  assert.deepEqual([1, 2, 3, 6, 15, 16].map(mistakeSpeaker), ['reem', 'badr', 'reem', 'badr', 'reem', 'badr']);
  const badr = { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Got it! I have two cat.' }], misconception: { incorrect: 'two cat', correct: 'two cats', reason: 'plural s' } };
  assert.deepEqual(parseReply(badr, 'answer', { sessionId: 6 }).misconception, { ...badr.misconception, speaker: 'badr' });
  assert.throws(() => parseReply(badr, 'answer', { sessionId: 7 }), 'odd lesson: Reem must make the error');
  assert.throws(() => parseReply({ ...badr, misconception: { ...badr.misconception, incorrect: 'three dog' } }, 'answer', { sessionId: 6 }));
  assert.ok(parseReply({ verdict: 'accurate', turns: [{ speaker: 'badr', text: 'two cats' }, { speaker: 'sara', text: 'ok' }] }, 'correct', { sessionId: 6 }));
  assert.throws(() => parseReply({ verdict: 'accurate', turns: [{ speaker: 'reem', text: 'two cats' }, { speaker: 'sara', text: 'ok' }] }, 'correct', { sessionId: 6 }));
});
test('understanding is kept only when grounded in Abboud\'s actual words and said by Badr', () => {
  const reply = (concept: string, badr = `Now I see: ${concept}`) => ({ verdict: 'accurate', turns: [{ speaker: 'badr', text: badr }, { speaker: 'reem', text: 'I says hello' }], misconception: { incorrect: 'I says hello', correct: 'I say hello', reason: 'I + base verb' }, understood: { speaker: 'badr', concept } });
  const abboudSpeech = ['Hello greets people when we meet'];
  assert.deepEqual(parseReply(reply('hello greets people'), 'answer', { sessionId: 1, abboudSpeech }).understood, { speaker: 'badr', concept: 'hello greets people' });
  assert.equal(parseReply(reply('Goodbye ends a call'), 'answer', { sessionId: 1, abboudSpeech }).understood, undefined, 'invented concept: no star evidence');
  assert.equal(parseReply(reply('hello greets people', 'OK thanks'), 'answer', { sessionId: 1, abboudSpeech }).understood, undefined, 'Badr must actually say it');
  assert.equal(parseReply(reply('hello greets people'), 'answer', { sessionId: 1 }).understood, undefined, 'no transcript, no grounding');
  assert.equal(parseReply(reply('greet'), 'answer', { sessionId: 1, abboudSpeech }).understood, undefined, 'whole words only');
});
test('Sara\'s closing praise quotes Abboud, gives exactly one tip, speaks it, and is idempotent', () => {
  const praise = { quote: 'two books', strength: 'وضّحت الجمع بمثال من الفصل.', tip: 'اسأل الطالب أن يعدّ معك بعد الشرح.' };
  const raw = { verdict: 'accurate', turns: [{ speaker: 'reem', text: 'two books' }, { speaker: 'sara', text: 'Great job!!!' }], praise };
  const context = { sessionId: 3, abboudSpeech: ['Add s: two books'] };
  assert.equal(completesLesson('correct', 3), true); assert.equal(completesLesson('correct', 5), false); assert.equal(completesLesson('review_two', 5), true);
  const parsed = parseReply(raw, 'correct', context);
  assert.deepEqual(parsed.praise, praise); assert.equal(parsed.turns[1].text, praiseLine(praise));
  assert.match(parsed.turns[1].text, /«two books»/); assert.match(parsed.turns[1].text, /نصيحة واحدة: اسأل/);
  assert.deepEqual(parseReply(parsed, 'correct', context), parsed, 'server output re-validated on the client gives the same reply');
  assert.equal(parseReply({ ...raw, praise: { ...praise, quote: 'three apples' } }, 'correct', context).praise, undefined, 'ungrounded praise dropped');
  assert.equal(parseReply({ ...raw, praise: { ...praise, quote: 'three apples' } }, 'correct', context).turns[1].text, 'Great job!!!');
  assert.equal(parseReply({ ...raw, praise: { ...praise, tip: 'Count. Then repeat.' } }, 'correct', context).praise, undefined, 'one tip only');
  assert.equal(parseReply(raw, 'correct', { ...context, sessionId: 5 }).praise, undefined, 'lesson 5 closes after the review, not here');
  assert.equal(parseReply({ verdict: 'inaccurate', turns: [{ speaker: 'sara', text: 'راجع' }], praise }, 'correct', context).praise, undefined, 'no praise for a wrong correction');
});
test('stars are idempotent per lesson, isolated per student, guests unsaved, corrupt data safe', () => {
  const { data, storage } = memory();
  let a = readAwards(storage, 'a'); assert.deepEqual(a, { stars: {}, name: 'عبود' });
  a = awardStar(storage, 'a', a, 'L1', 'explain'); a = awardStar(storage, 'a', a, 'L1', 'explain'); a = awardStar(storage, 'a', a, 'L1', 'correction');
  a = awardStar(storage, 'a', a, 'custom:الفضاء', 'explain');
  assert.equal(starCount(a), 3); assert.equal(starCount(readAwards(storage, 'a')), 3); assert.equal(starCount(readAwards(storage, 'b')), 0);
  const size = data.size; const guest = awardStar(storage, undefined, readAwards(storage), 'L1', 'explain');
  assert.equal(starCount(guest), 1); assert.equal(data.size, size, 'guest stars stay in memory');
  assert.equal(saveName(storage, 'a', a, ' <ريم> ').name, 'ريم'); assert.equal(readAwards(storage, 'a').name, 'ريم');
  data.set(awardsKey('a'), '{"stars":{"L1":{"explain":"yes","correction":true},"L2":7},"name":5}');
  assert.deepEqual(readAwards(storage, 'a'), { stars: { L1: { correction: true } }, name: 'عبود' });
  data.set(awardsKey('a'), '{'); assert.equal(starCount(readAwards(storage, 'a')), 0);
  for (const key of data.keys()) assert.equal(/xp|streak|certificate|progress/i.test(key), false, `separate from the official systems: ${key}`);
  assert.equal(earnedCertificate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]), false);
  assert.equal(earnedCertificate(Array.from({ length: 15 }, (_, i) => 15 - i)), true);
});
test('correction star needs the verified verdict AND the student really saying the corrected form', () => {
  const mistake = { incorrect: 'two book', correct: 'two books', reason: 'plural', speaker: 'reem' as const };
  const reply = (text: string, verdict = 'accurate' as const) => ({ verdict, turns: [{ speaker: 'reem' as const, text }, { speaker: 'sara' as const, text: 'ok' }] });
  assert.equal(correctionStar('correct', reply('Yes, two books!'), mistake), true);
  assert.equal(correctionStar('correct', reply('OK teacher'), mistake), false);
  assert.equal(correctionStar('correct', reply('two book… I mean two books'), mistake), false, 'still repeats the error');
  assert.equal(correctionStar('correct', reply('two books', 'inaccurate' as never), mistake), false);
  assert.equal(correctionStar('answer', reply('two books'), mistake), false); assert.equal(correctionStar('correct', reply('two books'), null), false);
  assert.equal(correctionStar('correct', reply('two books'), { ...mistake, speaker: 'badr' }), false, 'the student who erred must fix it');
});
test('parent summary: what he explained, English words, English turns, stars and Sara\'s tip; last 10 kept', () => {
  const messages = [{ speaker: 'abboud' as const, text: 'Hello يعني مرحبا. My name is Abboud' }, { speaker: 'badr' as const, text: 'What is hello?' },
    { speaker: 'abboud' as const, text: 'نقولها لما نقابل أحد' }, { speaker: 'abboud' as const, text: "Hello, I'm happy" }];
  const report = buildReport(messages, '👋 التحية', 2, { quote: 'My name is Abboud', strength: 'عرّفت بنفسك بجملة كاملة.', tip: 'قلها ببطء.' }, new Date('2026-11-09T08:00:00Z'));
  assert.deepEqual(report.englishWords, ['hello', 'my', 'name', 'is', 'abboud', "i'm", 'happy']);
  assert.equal(report.englishTurns, 2); assert.equal(report.abboudTurns, 3); assert.equal(report.stars, 2); assert.equal(report.tip, 'قلها ببطء.');
  assert.equal(report.explained, 'Hello يعني مرحبا. My name is Abboud');
  const text = reportText(report, 'عبود');
  for (const part of ['عبود', '👋 التحية', 'hello، my', 'في 2 من 3', 'نجوم الحصة: 2', 'قلها ببطء', 'عرّفت بنفسك']) assert.ok(text.includes(part), part);
  const { data, storage } = memory();
  for (let i = 0; i < 12; i++) saveReport(storage, 'a', { ...report, lesson: `L${i}` });
  assert.deepEqual(readReports(storage, 'a').map(r => r.lesson), ['L11', 'L10', 'L9', 'L8', 'L7', 'L6', 'L5', 'L4', 'L3', 'L2']);
  const size = data.size; saveReport(storage, undefined, report); assert.equal(data.size, size, 'guests not stored');
  data.set(reportsKey('a'), '[{"at":1},{"broken":true}]'); assert.deepEqual(readReports(storage, 'a'), []);
});
test('share uses Web Share when present, else the clipboard; never anything automatic', async () => {
  const shared: unknown[] = [];
  assert.equal(await shareText('x', { share: async (d?: ShareData) => { shared.push(d); } }), 'shared'); assert.deepEqual(shared, [{ title: 'ملخص حصة عبود المعلّم', text: 'x' }]);
  assert.equal(await shareText('x', { share: async () => { throw Object.assign(new Error('no'), { name: 'AbortError' }); } }), 'cancelled');
  const copied: string[] = [];
  assert.equal(await shareText('y', { clipboard: { writeText: async (t: string) => { copied.push(t); } } as unknown as Clipboard }), 'copied'); assert.deepEqual(copied, ['y']);
  assert.equal(await shareText('z', {}), 'failed');
});
test('certificate image is drawn with the plain canvas API, with the name and stars', () => {
  const texts: string[] = [];
  const ctx = { fillRect() {}, strokeRect() {}, fillText(t: string) { texts.push(t); }, fillStyle: '', strokeStyle: '', lineWidth: 0, font: '', textAlign: 'start', direction: 'ltr' };
  drawCertificate(ctx as never, { name: 'عبود', stars: 24, date: '9 نوفمبر 2026' });
  assert.ok(texts.includes('عبود')); assert.ok(texts.some(t => t.includes('شهادة معلّم صغير'))); assert.ok(texts.some(t => t.includes('24 نجمة')));
  assert.ok(texts.some(t => t.includes('ليست من شهادات الأكاديمية')), 'clearly not an official certificate'); assert.equal(ctx.direction, 'rtl');
});
test('HTTP handler: custom topic stays user data, unsafe topics are refused, instructions name the erring student and the praise', async () => {
  const seen: { prompt: string; instruction: string; schema: { properties?: Record<string, unknown> } }[] = [];
  let answer: unknown = { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'What is a ball?' }] };
  const app = express(); app.use(express.json());
  app.post('/api/sara/abboud-teacher', abboudTeacherHandler(async (prompt, instruction, schema) => { seen.push({ prompt, instruction, schema }); return JSON.stringify(answer); }));
  const server = app.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address(); assert.ok(address && typeof address !== 'string');
  const post = (body: unknown) => fetch(`http://127.0.0.1:${address.port}/api/sara/abboud-teacher`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    const custom = { sessionId: CUSTOM_LESSON_ID, stage: 'explain', teacherSpeech: 'A ball is round', history: [], customTopic: 'كرة القدم' };
    assert.equal((await post(custom)).status, 200);
    assert.equal(JSON.parse(seen[0].prompt).customTopic, 'كرة القدم'); assert.equal(seen[0].instruction.includes('كرة القدم'), false, 'topic never enters instructions');
    assert.match(seen[0].instruction, /Custom lesson/); assert.match(seen[0].instruction, /suitable for young children/);
    assert.ok(seen[0].schema.properties?.praise && seen[0].schema.properties?.understood);
    assert.equal((await post({ ...custom, customTopic: 'الحرب' })).status, 400); assert.equal(seen.length, 1, 'unsafe topic never reaches the AI');
    const praise = { quote: 'two cats', strength: 'مثال واضح.', tip: 'كرّرها معهم.' };
    answer = { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'two cats' }, { speaker: 'sara', text: 'x' }], praise };
    const history = [{ speaker: 'abboud', text: 'Plural: two cats' }, { speaker: 'badr', text: 'I have two cat' }];
    const closing = await post({ sessionId: 6, stage: 'correct', teacherSpeech: 'We say two cats', history });
    assert.equal(closing.status, 200); const body = await closing.json();
    assert.match(seen[1].instruction, /controlled-error student is Badr/); assert.match(seen[1].instruction, /praise:\{quote,strength,tip\}/);
    assert.deepEqual(body.praise, praise); assert.equal(body.turns[1].text, praiseLine(praise));
    assert.equal(seen[1].instruction.includes('We say two cats'), false, 'dialogue stays in the payload'); assert.match(seen[1].prompt, /We say two cats/);
  } finally { await new Promise<void>(resolve => server.close(() => resolve())); mock.restoreAll(); }
});
