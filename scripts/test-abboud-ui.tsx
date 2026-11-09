import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';
import { AbboudTeacherActivity } from '../src/components/AbboudTeacherActivity';
import { ClassroomVoice } from '../src/lib/abboud/voice';
import type { Recognition, RecognitionEvent } from '../src/lib/abboud/recognition';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
const { createRoot } = await import('react-dom/client');
let root: Root;
const host = document.getElementById('root')!;
const text = () => host.textContent || '';
function button(label: string) {
  const found = Array.from(host.querySelectorAll('button')).find(b => b.textContent?.includes(label));
  assert.ok(found, `Missing button ${label}`); return found;
}
async function click(label: string) { await act(async () => { button(label).click(); }); }
async function mount(uid = 'student-a') {
  root = createRoot(host);
  await act(async () => { root.render(<AbboudTeacherActivity uid={uid} onClose={() => {}} />); });
}
async function unmount() { await act(async () => root.unmount()); mock.restoreAll(); localStorage.clear(); }
async function write(value: string) {
  const textarea = host.querySelector('textarea'); assert.ok(textarea);
  // React tracks the native value setter; invoke the DOM setter, then a bubbling input event.
  const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLTextAreaElement.prototype, 'value')!.set!;
  await act(async () => { setter.call(textarea, value); textarea.dispatchEvent(new dom.window.Event('input', { bubbles: true })); textarea.dispatchEvent(new dom.window.Event('change', { bubbles: true })); });
}
class FakeRecognition implements Recognition {
  static latest: FakeRecognition;
  constructor() { FakeRecognition.latest = this; }
  lang = ''; continuous = false; interimResults = false;
  onstart: Recognition['onstart'] = null; onresult: Recognition['onresult'] = null;
  onerror: Recognition['onerror'] = null; onend: Recognition['onend'] = null;
  aborted = false; started = 0; stopped = 0;
  results: { isFinal: boolean; 0: { transcript: string } }[] = [];
  start() { this.started++; this.onstart?.(); }
  stop() { this.stopped++; this.onend?.(); }
  abort() { this.aborted = true; }
  /** A recognised phrase; like real continuous sessions the result list accumulates. */
  say(transcript: string, isFinal = true) {
    this.results = [...this.results.filter(r => r.isFinal), { isFinal, 0: { transcript } }];
    const event: RecognitionEvent = { resultIndex: this.results.length - 1, results: this.results };
    this.onresult?.(event);
  }
  /** The browser ends its session on its own (short silence / end of sentence). */
  silence() { this.onend?.(); }
}
window.SpeechRecognition = FakeRecognition;
const accurate = (speaker: string, message: string) => ({ verdict: 'accurate', turns: [{ speaker, text: message }] });
function service(responses: unknown[]) {
  const requests: { stage: string; teacherSpeech: string; history: unknown[]; sessionId: number }[] = [];
  mock.method(globalThis, 'fetch', async (_url: unknown, options: RequestInit) => {
    requests.push(JSON.parse(String(options.body)));
    const reply = responses.shift();
    return new Response(JSON.stringify(reply), { status: reply === null ? 503 : 200, headers: { 'Content-Type': 'application/json' } });
  });
  const voice = mock.method(ClassroomVoice.prototype, 'play', async () => {});
  return { requests, voice };
}
async function say(value: string) {
  await click('اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say(value); });
  await click('خلصت'); await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
}

test('first entry shows both students, board and mic; no writing wizard or scripted hints', async () => {
  await mount();
  try {
    assert.ok(host.querySelector('[data-testid="student-badr"]'));
    assert.ok(host.querySelector('[data-testid="student-reem"]'));
    assert.ok(host.querySelector('[aria-label="السبورة التفاعلية"]'));
    assert.ok(button('اضغط وتحدّث')); assert.equal(host.querySelector('textarea'), null);
    assert.equal(text().includes('My name is'), false);
    assert.equal(host.querySelectorAll('nav button').length, 5);
  } finally { await unmount(); }
});
test('voice explanation → grounded question → answer → controlled error → correct completion; replay no XP', async () => {
  const { requests, voice } = service([
    accurate('badr', 'When do we say hello?'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Understood' }, { speaker: 'reem', text: 'My name are Reem' }], misconception: { incorrect: 'My name are Reem', correct: 'My name is Reem', reason: 'Singular subject' } },
    { verdict: 'accurate', turns: [{ speaker: 'reem', text: 'My name is Reem' }, { speaker: 'sara', text: 'صححت الفعل بلطف.' }] }
  ]);
  await mount();
  try {
    await say('Hello greets people'); assert.match(text(), /When do we say hello/);
    await say('When meeting someone'); assert.match(text(), /My name are Reem/);
    await say('Use is: My name is Reem'); assert.match(text(), /اكتمل تفاعل/);
    assert.deepEqual(requests.map(r => r.stage), ['explain', 'answer', 'correct']);
    assert.equal(requests[0].teacherSpeech, 'Hello greets people'); assert.ok(requests[2].history.length > 3);
    assert.equal(voice.mock.callCount(), 3);
    assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), '[1]');
    await click('إعادة الصوت'); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), '[1]');
    assert.equal(Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).some(k => /xp|streak|certificate/i.test(k || '')), false);
  } finally { await unmount(); }
});
test('incorrect teaching stays on same stage; AI failure preserves speech without completion', async () => {
  const { requests } = service([{ verdict: 'inaccurate', turns: [{ speaker: 'sara', text: 'راجع معنى Hello' }] }, null]);
  await mount();
  try {
    await say('Hello means goodbye'); assert.match(text(), /راجع معنى/);
    await say('Hello is greeting'); assert.match(text(), /لم يتقدّم الدرس/); assert.match(text(), /Hello is greeting/);
    assert.deepEqual(requests.map(r => r.stage), ['explain', 'explain']); assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});
test('mic denied/no speech never calls AI; cleanup aborts mic on lesson change and unmount', async () => {
  const { requests } = service([]); await mount();
  try {
    await click('اضغط وتحدّث'); const mic = FakeRecognition.latest;
    await act(async () => { mic.onerror?.({ error: 'not-allowed' }); mic.onend?.(); });
    assert.match(text(), /لم يُسمح/); assert.equal(requests.length, 0);
    await click('اضغط وتحدّث'); const second = FakeRecognition.latest;
    await click('الألوان والأشياء'); assert.equal(second.aborted, true); assert.equal(second.onresult, null);
    await click('اضغط وتحدّث'); const third = FakeRecognition.latest;
    await act(async () => { third.onerror?.({ error: 'no-speech' }); third.onend?.(); });
    // Silence is not an error any more: the browser session is quietly replaced and Abboud keeps the floor.
    assert.notEqual(FakeRecognition.latest, third); assert.equal(text().includes('لم يُلتقط'), false); assert.equal(requests.length, 0);
    await click('خلصت'); assert.match(text(), /لم يُلتقط/); assert.equal(requests.length, 0);
    await click('اضغط وتحدّث'); const fourth = FakeRecognition.latest;
    await act(async () => root.unmount()); assert.equal(fourth.aborted, true); assert.equal(fourth.onend, null);
  } finally { mock.restoreAll(); localStorage.clear(); }
});
test('changing student resets conversation and progress scope', async () => {
  service([accurate('badr', 'A question')]); await mount('one');
  try {
    await say('Hello is greeting'); assert.match(text(), /A question/);
    localStorage.setItem('abboud-classroom:v2:one', '[1]');
    await act(async () => { root.render(<AbboudTeacherActivity uid="two" onClose={() => {}} />); });
    assert.equal(text().includes('A question'), false); assert.equal(text().includes('✓'), false);
    assert.equal(localStorage.getItem('abboud-classroom:v2:one'), '[1]');
  } finally { await unmount(); }
});
test('stale AI reply after lesson switch cannot play, advance, or persist', async () => {
  let resolve!: (value: Response) => void;
  mock.method(globalThis, 'fetch', () => new Promise<Response>(r => { resolve = r; }));
  const voice = mock.method(ClassroomVoice.prototype, 'play', async () => {});
  await mount();
  try {
    await click('اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say('My explanation'); }); await click('خلصت');
    await click('الألوان والأشياء');
    await act(async () => { resolve(new Response(JSON.stringify(accurate('badr', 'Stale reply')))); await new Promise(r => setImmediate(r)); });
    assert.equal(text().includes('Stale reply'), false); assert.equal(voice.mock.callCount(), 0); assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});
test('audio failure is visible, real reply stays on screen; mute and replay are explicit', async () => {
  service([accurate('badr', 'Real student question')]);
  mock.method(ClassroomVoice.prototype, 'play', async () => { throw new Error('blocked'); });
  await mount();
  try {
    await say('Hello'); assert.match(text(), /تعذّر تشغيل الصوت/); assert.match(text(), /Real student question/);
    await click('كتم الردود'); assert.equal(button('إعادة الصوت').disabled, true);
    await click('إلغاء الكتم'); assert.equal(button('إعادة الصوت').disabled, false);
  } finally { await unmount(); }
});

test('unsupported speech shows honest error; typing is opt-in and submits actual text', async () => {
  const { requests } = service([accurate('badr', 'What is your name?')]);
  const constructor = window.SpeechRecognition; window.SpeechRecognition = undefined;
  await mount();
  try {
    await click('اضغط وتحدّث'); assert.match(text(), /لا يدعم/); assert.equal(requests.length, 0);
    assert.equal(host.querySelector('textarea'), null);
    await click('الكتابة كبديل'); await write('Hello means greeting');
    await act(async () => { host.querySelector('form')!.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })); });
    assert.equal(requests[0]?.teacherSpeech, 'Hello means greeting');
  } finally { window.SpeechRecognition = constructor; await unmount(); }
});
test('review is incomplete until Abboud asks both review questions', async () => {
  const { requests } = service([
    accurate('badr', 'What do you mean by plural?'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Understood' }, { speaker: 'reem', text: 'two book' }], misconception: { incorrect: 'two book', correct: 'two books', reason: 'Plural s' } },
    { verdict: 'accurate', turns: [{ speaker: 'reem', text: 'two books' }, { speaker: 'sara', text: 'الآن اسأل سؤالين.' }] },
    accurate('badr', 'My name is Badr'),
    { verdict: 'accurate', turns: [{ speaker: 'reem', text: 'I like apples' }, { speaker: 'sara', text: 'انتهت المراجعة.' }] }
  ]);
  await mount();
  try {
    await click('المراجعة وسؤالان');
    await say('Hello, two books and I like apples'); await say('Plural takes s'); await say('two books, add s');
    assert.equal(localStorage.length, 0); assert.match(text(), /المراجعة الأول/);
    await say('What is your name?'); assert.equal(localStorage.length, 0); assert.match(text(), /ثانياً مختلفاً/);
    await say('What fruit do you like?'); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), '[5]');
    assert.deepEqual(requests.map(r => r.stage), ['explain', 'answer', 'correct', 'review_one', 'review_two']);
  } finally { await unmount(); }
});
async function selectBoardWord(word: string) {
  const found = Array.from(host.querySelectorAll('[aria-label="كلمات من شرح عبود"] button')).find(b => b.querySelector('span')?.textContent === word);
  assert.ok(found, `Missing actual board word: ${word}`);
  await act(async () => { if (found instanceof HTMLElement) found.click(); });
}
test('interactive board contains actual explanation, colors and counts; taps get student replies without stage/progress effects', async () => {
  const { requests, voice } = service([
    accurate('badr', 'What color are the books?'),
    accurate('badr', 'The books are red.'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Understood' }, { speaker: 'reem', text: 'three book' }], misconception: { incorrect: 'three book', correct: 'three books', reason: 'plural' } }
  ]);
  await mount();
  try {
    await click('الألوان والأشياء'); await say('I have three red books');
    const board = host.querySelector('[data-testid="abboud-interactive-board"]'); assert.ok(board);
    assert.match(board.textContent || '', /I have three red books/);
    assert.ok(board.querySelector('[aria-label="لون red"]')); assert.ok(board.querySelector('[aria-label="عدد 3"]'));
    assert.equal(board.textContent?.includes('blue'), false);
    await selectBoardWord('red'); await click('بدر، طبّق هذا');
    assert.match(board.textContent || '', /The books are red/); assert.equal(requests[1].stage, 'board');
    assert.equal(localStorage.length, 0); assert.equal(voice.mock.callCount(), 2);
    await click('اقرأ المحدّد'); assert.equal(requests.length, 2); assert.equal(voice.mock.callCount(), 3);
    await say('The books are red');
    assert.equal(requests[2].stage, 'answer');
    assert.equal(JSON.stringify(requests[2].history).includes('The books are red.'), false);
    assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});
test('board does not reveal the controlled correction before a verified teacher correction', async () => {
  service([
    accurate('badr', 'How do we say two?'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Understood' }, { speaker: 'reem', text: 'two book' }], misconception: { incorrect: 'two book', correct: 'two books', reason: 'plural' } },
    { verdict: 'inaccurate', turns: [{ speaker: 'sara', text: 'راجع الجمع' }] },
    { verdict: 'accurate', turns: [{ speaker: 'reem', text: 'two books' }, { speaker: 'sara', text: 'صححت الجمع.' }] }
  ]);
  await mount();
  try {
    await click('الأعداد 1–10'); await say('two means اثنين'); await say('two');
    const board = host.querySelector('[data-testid="abboud-interactive-board"]'); assert.ok(board);
    assert.match(board.textContent || '', /بانتظار تصحيح عبود/); assert.equal(board.querySelector('ins'), null);
    await say('two book is correct'); assert.equal(board.querySelector('ins'), null); assert.equal(localStorage.length, 0);
    await say('two books, add s for plural'); assert.equal(board.querySelector('ins')?.textContent, 'two books'); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), '[3]');
  } finally { await unmount(); }
});
test('startup failure preserves transcript and unverified board without pretending hearing or success', async () => {
  mock.method(globalThis, 'fetch', async () => new Response('FUNCTION_INVOCATION_FAILED', { status: 500 }));
  const voice = mock.method(ClassroomVoice.prototype, 'play', async () => {});
  await mount();
  try {
    await say('هلو بدر اند ريم'); assert.match(text(), /خادم الفصل تعذّر تشغيله/);
    const board = host.querySelector('[data-testid="abboud-interactive-board"]'); assert.ok(board);
    assert.match(board.textContent || '', /هلو بدر اند ريم/); assert.match(board.textContent || '', /لم يتحقق منه الطالبان/);
    assert.equal(voice.mock.callCount(), 0); assert.equal(localStorage.length, 0); assert.ok(button('إرسال الكلام المحفوظ'));
  } finally { await unmount(); }
});
test('late board replies after switching student cannot render, speak or persist', async () => {
  service([accurate('badr', 'Question about red')]); await mount();
  try {
    await say('red book'); await selectBoardWord('red');
    let resolve!: (value: Response) => void;
    mock.method(globalThis, 'fetch', () => new Promise<Response>(r => { resolve = r; }));
    await click('ريم، طبّقي هذا');
    await act(async () => { root.render(<AbboudTeacherActivity uid="another-student" onClose={() => {}} />); });
    await act(async () => { resolve(new Response(JSON.stringify(accurate('reem', 'Late board reply')))); await new Promise(r => setImmediate(r)); });
    assert.equal(text().includes('Late board reply'), false); assert.equal(text().includes('red book'), false); assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});

test('board starts large with a full workspace, compact student panel and reachable teaching dock', async () => {
  await mount();
  try {
    const classroom = host.querySelector('[data-testid="abboud-classroom"]'); assert.ok(classroom);
    assert.equal(classroom.getAttribute('data-board-mode'), 'large');
    const board = host.querySelector('[data-testid="abboud-interactive-board"]'); assert.ok(board);
    assert.equal(board.getAttribute('data-board-size'), 'large'); assert.equal(board.className.includes('max-w-2xl'), false);
    assert.ok(board.querySelector('.abboud-board-body[tabindex="0"]'));
    const students = host.querySelector('[data-testid="abboud-students"]'); assert.ok(students);
    assert.ok(students.querySelector('[data-testid="student-badr"]')); assert.ok(students.querySelector('[data-testid="student-reem"]'));
    const controls = host.querySelector('[data-testid="abboud-teacher-controls"]'); assert.ok(controls);
    assert.ok(controls.querySelector('.abboud-teacher-dock [data-testid="abboud-microphone"]'));
    assert.equal(host.querySelector('[data-testid="abboud-board-expand"]')?.getAttribute('aria-expanded'), 'false');
  } finally { await unmount(); }
});
test('scoped layout contract covers 360/390 widths, bounded scrolling and the expanded viewport', () => {
  // jsdom does not measure geometry: guard the actual stylesheet hooks, not pretend pixel screenshots.
  const all = readFileSync('src/index.css', 'utf8');
  const css = all.slice(all.indexOf("/* Abboud's board-first classroom:"));
  assert.match(css, /max-width: 1440px/); assert.match(css, /height: calc\(100dvh - 24px\)/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) 190px/);
  assert.match(css, /\.abboud-board-body \{[^}]*overflow-y: auto; overflow-x: hidden/);
  assert.match(css, /\.abboud-teacher-dock \{[^}]*position: sticky; top: 0/);
  assert.match(css, /\.abboud-dialog-expanded \.abboud-shell \{[^}]*max-width: none;[^}]*height: 100dvh/);
  const mobile = css.split('@media (max-width: 639px) {')[1]; assert.ok(mobile);
  for (const width of [360, 390]) {
    assert.ok(width <= 639);
    assert.match(mobile, /grid-template-areas: "students" "board"/);
    assert.match(mobile, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
    assert.match(mobile, /\.abboud-lessons select \{[^}]*width: 0; min-width: 0/);
  }
  assert.equal(css.includes('100vw'), false);
  const shortViewport = css.split('@media (max-height: 500px) {')[1]; assert.ok(shortViewport);
  assert.match(shortViewport, /\.abboud-dialog \{ overflow-y: auto/);
  assert.match(shortViewport, /\.abboud-workspace \{ flex: none; height: 340px/);
  assert.match(shortViewport, /\.abboud-controls \{ max-height: none; overflow: visible/);
});
test('expansion and return preserve board selection, typed draft, student responses and pending lesson stage', async () => {
  const { requests } = service([accurate('badr', 'Which color is the book?'), accurate('badr', 'The book is red.')]);
  await mount();
  try {
    await say('This is a red book'); await selectBoardWord('red'); await click('الكتابة كبديل'); await write('My answer is still being prepared');
    const board = host.querySelector('[data-testid="abboud-interactive-board"]'); const textarea = host.querySelector('textarea');
    await click('توسعة السبورة');
    assert.equal(host.querySelector('[data-testid="abboud-classroom"]')?.getAttribute('data-board-mode'), 'expanded');
    assert.equal(host.querySelector('[data-testid="abboud-interactive-board"]'), board); assert.equal(host.querySelector('textarea'), textarea);
    assert.equal(textarea?.value, 'My answer is still being prepared');
    assert.ok(host.querySelector('[aria-label="كلمات من شرح عبود"] button[aria-pressed="true"]'));
    assert.equal(requests.length, 1); assert.equal(localStorage.length, 0);
    await click('بدر، طبّق هذا'); assert.match(text(), /The book is red/); assert.equal(requests[1].stage, 'board');
    await click('رجوع لحجم الفصل');
    assert.equal(host.querySelector('[data-testid="abboud-interactive-board"]'), board);
    assert.equal(textarea?.value, 'My answer is still being prepared'); assert.match(text(), /بدر عنده سؤال/);
    assert.match(text(), /The book is red/); assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});
test('Escape exits expansion before closing, and focus returns to its trigger then the external opener', async () => {
  const opener = document.createElement('button'); document.body.append(opener); opener.focus();
  let closed = 0;
  await mount();
  try {
    await act(async () => { root.render(<AbboudTeacherActivity uid="student-a" onClose={() => { closed++; }} />); });
    await click('توسعة السبورة');
    assert.equal(document.activeElement, host.querySelector('[data-testid="abboud-workspace"]'));
    await act(async () => { window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
    assert.equal(closed, 0); assert.equal(document.activeElement, host.querySelector('[data-testid="abboud-board-expand"]'));
    assert.equal(host.querySelector('[data-testid="abboud-classroom"]')?.getAttribute('data-board-mode'), 'large');
    await act(async () => { window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true })); });
    assert.equal(closed, 1);
  } finally { await unmount(); assert.equal(document.activeElement, opener); opener.remove(); }
});
test('resizing the classroom does not restart or abort the active microphone', async () => {
  service([accurate('badr', 'A real question')]); await mount();
  try {
    await click('اضغط وتحدّث'); const mic = FakeRecognition.latest;
    await click('توسعة السبورة'); assert.equal(mic.aborted, false); assert.equal(FakeRecognition.latest, mic);
    assert.match(button('خلصت').textContent || '', /خلصت/);
    await click('رجوع لحجم الفصل'); assert.equal(mic.aborted, false);
    await act(async () => { mic.say('Hello students'); }); await click('خلصت');
    await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
    assert.match(text(), /A real question/);
  } finally { await unmount(); }
});

test('mic stays open through browser pauses; live text accumulates and is sent once only on «خلصت»', async () => {
  const { requests } = service([accurate('badr', 'Is red a colour?')]); await mount();
  try {
    await click('اضغط وتحدّث'); const first = FakeRecognition.latest;
    assert.equal(first.continuous, true); assert.equal(first.interimResults, true);
    await act(async () => { first.say('This is', false); });
    assert.match(host.querySelector('[data-testid="abboud-live-transcript"]')?.textContent || '', /This is/);
    assert.match(text(), /لن يُرسل شيء قبل/);
    await act(async () => { first.say('This is a red book'); first.silence(); });
    assert.equal(requests.length, 0, 'browser end-of-sentence must not send');
    const second = FakeRecognition.latest; assert.notEqual(second, first); assert.equal(second.started, 1);
    assert.ok(button('خلصت'), 'still listening after the automatic browser stop');
    await act(async () => { second.say('This is a red book'); second.say('and I like apples'); second.silence(); });
    const third = FakeRecognition.latest;
    await act(async () => { third.say('three apples'); });
    assert.equal(host.querySelector('[data-testid="abboud-live-transcript"]')?.textContent, 'This is a red book and I like apples three apples');
    await click('خلصت'); await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].teacherSpeech, 'This is a red book and I like apples three apples');
    assert.match(text(), /Is red a colour/);
    await act(async () => { third.silence(); }); assert.equal(requests.length, 1, 'late browser events cannot resend');
  } finally { await unmount(); }
});
test('permission loss mid-dictation stops without looping, keeps text unsent and lets Abboud continue it', async () => {
  const { requests } = service([accurate('badr', 'Understood')]); await mount();
  try {
    await click('اضغط وتحدّث'); const mic = FakeRecognition.latest;
    await act(async () => { mic.say('Hello means marhaba'); mic.onerror?.({ error: 'not-allowed' }); mic.onend?.(); });
    assert.equal(FakeRecognition.latest, mic, 'no restart after a permission error'); assert.equal(mic.aborted, true);
    assert.match(text(), /لم يُسمح/); assert.equal(requests.length, 0); assert.match(text(), /Hello means marhaba/);
    await click('أكمل الكلام'); const resumed = FakeRecognition.latest; assert.notEqual(resumed, mic);
    await act(async () => { resumed.say('and we say it to greet'); }); await click('خلصت');
    await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
    assert.equal(requests[0]?.teacherSpeech, 'Hello means marhaba and we say it to greet');
  } finally { await unmount(); }
});
test('stop and lesson change release a restarted mic without sending the collected speech', async () => {
  const { requests } = service([]); await mount();
  try {
    await click('اضغط وتحدّث'); const first = FakeRecognition.latest;
    await act(async () => { first.say('Colours are'); first.silence(); });
    const restarted = FakeRecognition.latest; assert.notEqual(restarted, first);
    await click('إيقاف الصوت والميكروفون'); assert.equal(restarted.aborted, true); assert.equal(restarted.onend, null);
    assert.equal(requests.length, 0); assert.ok(button('اضغط وتحدّث'));
    await click('اضغط وتحدّث'); const next = FakeRecognition.latest; await act(async () => { next.say('One two'); next.silence(); });
    const after = FakeRecognition.latest; await click('الألوان والأشياء');
    assert.equal(after.aborted, true); assert.equal(requests.length, 0);
  } finally { await unmount(); }
});
