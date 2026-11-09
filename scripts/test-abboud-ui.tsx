import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';
import { AbboudTeacherActivity } from '../src/components/AbboudTeacherActivity';
import { ClassroomVoice } from '../src/lib/abboud/voice';
import type { Recognition, RecognitionEvent } from '../src/lib/abboud/recognition';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, HTMLButtonElement: dom.window.HTMLButtonElement, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
// Sara's board write-on animation uses window.setTimeout; run it immediately so tests read the drawn board.
Object.assign(dom.window, { setTimeout: (run: () => void) => { run(); return 0; }, clearTimeout: () => {} });
// Media/animation APIs jsdom lacks, used by the shared teacher face (TutorVideoFace).
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 16), cancelAnimationFrame: (id: ReturnType<typeof setTimeout>) => clearTimeout(id) });
const { createRoot } = await import('react-dom/client');
// Resolve the lazily loaded Sara board up front (tldraw/WebGL/CSS leaves are stubbed by scripts/test-stubs).
const { default: TutorTldrawBoard } = await import('../src/components/TutorTldrawBoard');
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
  await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
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
    assert.equal(host.querySelectorAll('nav [aria-label="اختيار الدرس"] button').length, 16, '15 lessons + «درس من اختياري»');
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
    assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), null); assert.match(text(), /المراجعة الأول/);
    await say('What is your name?'); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), null); assert.match(text(), /ثانياً مختلفاً/);
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
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Understood, I have three book' }], misconception: { incorrect: 'three book', correct: 'three books', reason: 'plural' } }
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
    const canvas = () => board.querySelector('[data-testid="tldraw-canvas"]')?.textContent || '';
    assert.match(canvas(), /بانتظار تصحيح عبود/); assert.equal(canvas().includes('✅'), false);
    await say('two book is correct'); assert.equal(canvas().includes('✅'), false); assert.equal(localStorage.length, 0);
    await say('two books, add s for plural'); assert.match(canvas(), /❌ two book\n✅ two books/); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), '[3]');
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
    assert.equal(board.getAttribute('data-board'), 'sara'); assert.ok(board.querySelector('[data-testid="tldraw-board"] [data-testid="tldraw-canvas"]'));
    assert.ok(board.querySelector('.abboud-board-picks[tabindex="0"]'));
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
  assert.match(css, /\.abboud-board-surface \{ flex: 1 1 0%; min-height: 280px/);
  assert.match(css, /\.abboud-board-picks \{[^}]*overflow-y: auto; overflow-x: hidden/);
  assert.equal(/abboud-board-(body|source|title)/.test(css), false, 'old custom board styles removed');
  assert.match(css, /\.abboud-teacher-dock \{[^}]*position: sticky; top: 0/);
  assert.match(css, /\.abboud-dialog-expanded \.abboud-shell \{[^}]*max-width: none;[^}]*height: 100dvh/);
  const mobile = css.split('@media (max-width: 639px) {')[1]; assert.ok(mobile);
  for (const width of [360, 390]) {
    assert.ok(width <= 639);
    assert.match(mobile, /grid-template-areas: "students" "board"/);
    assert.match(mobile, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
    assert.match(mobile, /\.abboud-lessons select \{[^}]*width: 0; min-width: 0/);
    assert.match(mobile, /\.abboud-board-surface \{ flex: none; height: clamp\(300px, 58dvh, 520px\)/);
    assert.match(mobile, /\.abboud-dialog \.abboud-shell \{ overflow-y: auto; overflow-x: hidden/);
    assert.match(mobile, /\.abboud-controls \{ position: sticky; bottom: 0/);
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

test("Sara's class keeps her board unchanged: self-expanding overlay, avatar and the same tools", async () => {
  const calls = [{ tool: 'drawBoardText', payload: { content: 'Past Simple', fontSize: 'l', color: 'yellow' } }] as const;
  root = createRoot(host);
  try {
    // Exactly the props SaraBoardTutor passes (no host expansion).
    await act(async () => { root.render(<TutorTldrawBoard calls={[...calls]} personaId="sara" lessonTitle="Past Simple" speaking={false} replayKey={0} onSpeak={() => {}} />); });
    const board = host.querySelector('[data-testid="tldraw-board"]'); assert.ok(board);
    assert.equal(board.className.includes('fixed inset-0 z-[400]'), false); assert.ok(board.className.includes('w-full h-full'));
    assert.deepEqual(Array.from(board.querySelectorAll('.board-tool-action-btn')).map(b => b.textContent),
      ['🖥️توسيع السبورة', '📋قالب الدرس', '📝ملاحظة لاصقة', '🙋اسأل سارة', '📷اشرح الصورة', '🧽مسح']);
    assert.match(board.querySelector('[data-testid="tldraw-canvas"]')?.textContent || '', /Past Simple/);
    await act(async () => { (host.querySelector('[data-testid="board-expand"]') as HTMLElement).click(); });
    assert.ok(board.className.includes('fixed inset-0 z-[400]'), 'Sara board still expands itself full-screen');
    assert.match(host.querySelector('[data-testid="board-expand"]')?.textContent || '', /تصغير/);
  } finally { await unmount(); }
});
test("Abboud's classroom renders Sara's very board with the explanation drawn on it, students and mic beside it", async () => {
  service([accurate('badr', 'What colour is the apple?')]); await mount();
  try {
    const board = host.querySelector('[data-testid="abboud-interactive-board"] [data-testid="tldraw-board"]'); assert.ok(board, 'Sara board component');
    assert.deepEqual(Array.from(board.querySelectorAll('.board-tool-action-btn')).map(b => b.textContent),
      ['🖥️توسيع السبورة', '📋قالب الدرس', '📝ملاحظة لاصقة', '🙋اسأل سارة', '📷اشرح الصورة', '🧽مسح']);
    assert.equal(board.querySelector('[data-testid="tutor-avatar"]')?.getAttribute('data-agent'), 'sara');
    const canvas = () => board.querySelector('[data-testid="tldraw-canvas"]')?.textContent || '';
    assert.match(canvas(), /التحية والتعريف/); assert.equal(canvas().includes('My name is'), false, 'no scripted content before Abboud speaks');
    await say('I like three red apples');
    assert.match(canvas(), /عبود: I like three red apples/); assert.match(canvas(), /three/); assert.match(canvas(), /●●●/); assert.match(canvas(), /🔴/);
    await selectBoardWord('red'); await click('بدر، طبّق هذا');
    assert.ok(host.querySelector('[data-testid="student-badr"]')); assert.ok(host.querySelector('[data-testid="abboud-microphone"]'));
  } finally { await unmount(); }
});
test("Sara's toolbar expand drives Abboud's expansion: no full-screen overlay hiding students or mic; state kept", async () => {
  service([accurate('badr', 'Is it red?')]); await mount();
  try {
    await say('A red book'); await selectBoardWord('red');
    const saraBoard = host.querySelector('[data-testid="tldraw-board"]'); const canvas = host.querySelector('[data-testid="tldraw-canvas"]');
    await act(async () => { (host.querySelector('[data-testid="board-expand"]') as HTMLElement).focus(); (host.querySelector('[data-testid="board-expand"]') as HTMLElement).click(); });
    assert.equal(host.querySelector('[data-testid="abboud-classroom"]')?.getAttribute('data-board-mode'), 'expanded');
    assert.equal(saraBoard?.className.includes('fixed inset-0'), false, 'board stays inside the classroom layout');
    assert.equal(host.querySelector('[data-testid="tldraw-board"]'), saraBoard); assert.equal(host.querySelector('[data-testid="tldraw-canvas"]'), canvas);
    assert.match(host.querySelector('[data-testid="board-expand"]')?.textContent || '', /تصغير/);
    assert.ok(host.querySelector('[data-testid="abboud-students"] [data-testid="student-reem"]')); assert.ok(host.querySelector('[data-testid="abboud-microphone"]'));
    assert.ok(host.querySelector('[aria-label="كلمات من شرح عبود"] button[aria-pressed="true"]'));
    await act(async () => { window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    assert.equal(host.querySelector('[data-testid="abboud-classroom"]')?.getAttribute('data-board-mode'), 'large');
    assert.equal(document.activeElement, host.querySelector('[data-testid="board-expand"]'), 'focus returns to the control that expanded');
  } finally { await unmount(); }
});
test("Escape inside Sara's canvas stays with the board instead of closing the classroom", async () => {
  let closed = 0; root = createRoot(host);
  try {
    await act(async () => { root.render(<AbboudTeacherActivity uid="student-a" onClose={() => { closed++; }} />); });
    await act(async () => { await new Promise(resolve => setImmediate(resolve)); });
    const canvas = host.querySelector('[data-testid="tldraw-canvas"]') as HTMLElement; assert.ok(canvas);
    await act(async () => { canvas.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); });
    assert.equal(closed, 0); assert.ok(host.querySelector('[data-testid="abboud-classroom"]'));
  } finally { await unmount(); }
});

const face = (id: string) => host.querySelector(`[data-face="${id}"]`);
const clipOf = (id: string) => face(id)?.querySelector('.tutor-video-face')?.getAttribute('data-clip');
test('Badr and Reem use the teachers\' face system: portrait + idle loop from /tutors, only the speaker talks, no laugh clip', async () => {
  service([accurate('badr', 'What is hello?')]);
  let finish!: () => void;
  mock.method(ClassroomVoice.prototype, 'play', async (_turns: unknown, onSpeaker: (s: string) => void) => { onSpeaker('badr'); await new Promise<void>(r => { finish = r; }); });
  await mount();
  try {
    for (const id of ['student-badr', 'student-reem']) {
      assert.equal(face(id)?.querySelector('img.tutor-video-poster')?.getAttribute('src'), `/tutors/${id}.webp`);
      assert.deepEqual(Array.from(face(id)!.querySelectorAll('source')).map(s => s.getAttribute('src')), [`/tutors/video/${id}-idle.webm`, `/tutors/video/${id}-idle.mp4`]);
      assert.equal(clipOf(id), 'idle');
    }
    await click('اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say('Hello is a greeting'); }); await click('خلصت');
    await act(async () => { await new Promise(r => setImmediate(r)); });
    assert.equal(clipOf('student-badr'), 'talk'); assert.equal(face('student-badr')?.getAttribute('data-speaking'), 'true');
    assert.equal(clipOf('student-reem'), 'idle', 'the other student keeps listening');
    assert.equal(host.querySelector('[data-testid="tutor-avatar"]')?.getAttribute('data-speaking'), 'false', 'Sara does not talk when Badr does');
    assert.equal(host.querySelector('[data-testid="tutor-avatar"]')?.getAttribute('data-follow-playback'), 'false');
    await act(async () => { await new Promise(r => setTimeout(r, 1300)); });
    assert.equal(host.querySelectorAll('source[src*="student-"][src*="laugh"]').length, 0);
    assert.ok(host.querySelector('source[src="/tutors/video/student-badr-talk.webm"]'), 'talk clip lazily loaded like the teachers');
    await act(async () => { finish(); await new Promise(r => setImmediate(r)); });
    assert.equal(clipOf('student-badr'), 'idle');
  } finally { await unmount(); }
});
test('student face falls back to the still portrait, then the emoji, and phones play only the speaker', async () => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({ matches: query === '(max-width: 639px)', addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
  await mount();
  try {
    assert.equal(face('student-reem')?.querySelector('video'), null, 'phone: idle students show the still, no video');
    assert.equal(face('student-reem')?.querySelector('img')?.getAttribute('src'), '/tutors/student-reem.webp');
  } finally { await unmount(); window.matchMedia = original; }
  await mount();
  try {
    const video = face('student-badr')?.querySelector('video'); assert.ok(video);
    await act(async () => { video.dispatchEvent(new dom.window.Event('error')); });
    assert.equal(face('student-badr')?.querySelector('video'), null); assert.ok(face('student-badr')?.querySelector('img'));
    await act(async () => { face('student-badr')!.querySelector('img')!.dispatchEvent(new dom.window.Event('error')); });
    assert.match(face('student-badr')?.textContent || '', /👦🏻/);
  } finally { await unmount(); }
});
test('teacher faces are unchanged by default: follow real playback (not the prop) and keep the laugh clip', async () => {
  const { TutorVideoFace } = await import('../src/components/tutor3d/TutorVideoFace');
  const { markBufferSpeech } = await import('../src/lib/speechLevel');
  root = createRoot(host);
  try {
    await act(async () => { root.render(<TutorVideoFace id="sara" alt="سارة" isSpeaking={true} onFail={() => {}} />); });
    await act(async () => { await new Promise(r => setTimeout(r, 40)); });
    assert.equal(host.querySelector('.tutor-video-face')?.getAttribute('data-clip'), 'idle', 'prop alone does not animate a teacher');
    markBufferSpeech(true);
    await act(async () => { await new Promise(r => setTimeout(r, 40)); });
    assert.equal(host.querySelector('.tutor-video-face')?.getAttribute('data-clip'), 'talk');
    markBufferSpeech(false);
    await act(async () => { await new Promise(r => setTimeout(r, 1300)); });
    assert.ok(host.querySelector('source[src="/tutors/video/sara-laugh.webm"]'));
  } finally { await unmount(); }
});
test('student assets exist next to the teachers\' assets with the same formats and light sizes', () => {
  for (const id of ['student-badr', 'student-reem']) {
    assert.ok(statSync(`public/tutors/${id}.webp`).size < 40_000);
    for (const clip of ['idle', 'talk']) for (const ext of ['webm', 'mp4']) assert.ok(statSync(`public/tutors/video/${id}-${clip}.${ext}`).size < 120_000);
  }
  for (const teacher of ['sara', 'business', 'exams', 'grammar', 'lama', 'reem', 'haya', 'jana']) assert.ok(statSync(`public/tutors/${teacher}.webp`).size > 0, 'teacher assets untouched');
});
test('Abboud the teacher has his own face beside the mic: idle, talks from the mic press until «خلصت», never on student audio', async () => {
  service([accurate('badr', 'What is hello?')]);
  let finish!: () => void;
  mock.method(ClassroomVoice.prototype, 'play', async (_turns: unknown, onSpeaker: (s: string) => void) => { onSpeaker('badr'); await new Promise<void>(r => { finish = r; }); });
  await mount();
  try {
    const teacher = face('teacher-abboud'); assert.ok(teacher);
    assert.ok(teacher.closest('.abboud-teacher-dock .abboud-mic-row')?.querySelector('[data-testid="abboud-microphone"]'), 'sits next to the mic in the teaching dock');
    assert.ok(teacher.classList.contains('abboud-teacher-face'));
    assert.equal(teacher.querySelector('img.tutor-video-poster')?.getAttribute('src'), '/tutors/teacher-abboud.webp');
    assert.deepEqual(Array.from(teacher.querySelectorAll('source')).map(s => s.getAttribute('src')), ['/tutors/video/teacher-abboud-idle.webm', '/tutors/video/teacher-abboud-idle.mp4']);
    assert.equal(clipOf('teacher-abboud'), 'idle'); assert.equal(teacher.getAttribute('data-speaking'), 'false');
    await click('اضغط وتحدّث');
    assert.equal(clipOf('teacher-abboud'), 'talk'); assert.ok(face('teacher-abboud')?.classList.contains('is-speaking'), 'gold ring glows');
    assert.equal(clipOf('student-badr'), 'idle'); assert.equal(clipOf('student-reem'), 'idle');
    await act(async () => { FakeRecognition.latest.say('Hello is'); FakeRecognition.latest.silence(); });
    assert.equal(clipOf('teacher-abboud'), 'talk', 'keeps talking through browser pauses');
    await act(async () => { await new Promise(r => setTimeout(r, 1300)); });
    assert.ok(host.querySelector('source[src="/tutors/video/teacher-abboud-talk.webm"]'), 'talk clip lazily loaded like the teachers');
    await act(async () => { FakeRecognition.latest.say('a greeting'); }); await click('خلصت');
    await act(async () => { await new Promise(r => setImmediate(r)); });
    assert.equal(clipOf('student-badr'), 'talk');
    assert.equal(clipOf('teacher-abboud'), 'idle', 'student audio does not move Abboud\'s mouth');
    assert.equal(face('teacher-abboud')?.getAttribute('data-speaking'), 'false');
    await act(async () => { await new Promise(r => setTimeout(r, 1300)); });
    assert.equal(host.querySelectorAll('source[src*="teacher-abboud-laugh"]').length, 0);
    await act(async () => { finish(); await new Promise(r => setImmediate(r)); });
    await click('اضغط وتحدّث'); assert.equal(clipOf('teacher-abboud'), 'talk');
    await click('إيقاف الصوت والميكروفون'); assert.equal(clipOf('teacher-abboud'), 'idle', 'stopping the mic returns him to idle');
  } finally { await unmount(); }
});
test('phones show Abboud as a still until he speaks; his face falls back to the still, then the emoji', async () => {
  const original = window.matchMedia;
  window.matchMedia = ((query: string) => ({ matches: query === '(max-width: 639px)', addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
  service([]); await mount();
  try {
    assert.equal(face('teacher-abboud')?.querySelector('video'), null);
    assert.equal(face('teacher-abboud')?.querySelector('img')?.getAttribute('src'), '/tutors/teacher-abboud.webp');
    await click('اضغط وتحدّث');
    assert.ok(face('teacher-abboud')?.querySelector('video'), 'phone plays only while Abboud speaks');
    await click('إيقاف الصوت والميكروفون'); assert.equal(face('teacher-abboud')?.querySelector('video'), null);
  } finally { await unmount(); window.matchMedia = original; }
  await mount();
  try {
    const video = face('teacher-abboud')?.querySelector('video'); assert.ok(video);
    await act(async () => { video.dispatchEvent(new dom.window.Event('error')); });
    assert.equal(face('teacher-abboud')?.querySelector('video'), null); assert.ok(face('teacher-abboud')?.querySelector('img'));
    await act(async () => { face('teacher-abboud')!.querySelector('img')!.dispatchEvent(new dom.window.Event('error')); });
    assert.match(face('teacher-abboud')?.textContent || '', /👦🏽/);
  } finally { await unmount(); }
});
test('Abboud\'s cartoon assets: same formats as the students, light, and the portrait carries no EXIF/XMP/ICC metadata', () => {
  const portrait = readFileSync('public/tutors/teacher-abboud.webp');
  assert.equal(portrait.subarray(0, 4).toString('latin1'), 'RIFF'); assert.equal(portrait.subarray(8, 12).toString('latin1'), 'WEBP');
  assert.ok(portrait.length < 40_000);
  for (const chunk of ['EXIF', 'XMP ', 'ICCP']) assert.equal(portrait.includes(Buffer.from(chunk, 'latin1')), false, `no ${chunk} chunk`);
  for (const clip of ['idle', 'talk']) for (const ext of ['webm', 'mp4']) assert.ok(statSync(`public/tutors/video/teacher-abboud-${clip}.${ext}`).size < 120_000);
  const css = readFileSync('src/index.css', 'utf8');
  assert.match(css, /\.abboud-teacher-face \{ flex: none; width: 64px;/);
  assert.match(css.split('@media (max-width: 639px) {')[1], /\.abboud-teacher-face \{ width: 40px;/);
});
// ── Teacher stars, Sara's praise, controlled errors, «درس من اختياري», parent summary, 15 lessons, certificate ──
const lessonOne = (extra: { understood?: unknown; repeat?: string } = {}) => [
  accurate('badr', 'When do we say hello?'),
  { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'I see: Hello greets people!' }, { speaker: 'reem', text: 'My name are Reem' }], misconception: { incorrect: 'My name are Reem', correct: 'My name is Reem', reason: 'Singular subject' },
    understood: extra.understood ?? { speaker: 'badr', concept: 'Hello greets people' } },
  { verdict: 'accurate', turns: [{ speaker: 'reem', text: extra.repeat ?? 'My name is Reem' }, { speaker: 'sara', text: 'AI summary' }],
    praise: { quote: 'Hello greets people', strength: 'شرحت معنى Hello بجملة واضحة.', tip: 'اسأل سؤالاً قصيراً بعد الشرح.' } }
];
async function teachLessonOne() { await say('Hello greets people'); await say('We say hello when we meet'); await say('Use is: My name is Reem'); }
const awardsOf = (uid = 'student-a') => JSON.parse(localStorage.getItem(`abboud-teacher-awards:v1:${uid}`) || 'null');
const stars = () => host.querySelector('[data-testid="abboud-stars"]')?.textContent;
test('teacher stars: one for grounded understanding, one for a verified correction; Sara praises a real quote with one tip, by voice and text', async () => {
  const { voice } = service(lessonOne()); await mount();
  try {
    assert.equal(stars(), '⭐ 0');
    await say('Hello greets people'); await say('We say hello when we meet');
    assert.match(host.querySelector('[data-testid="abboud-star-notice"]')?.textContent || '', /نجمة شرح! بدر فهم «Hello greets people»/);
    assert.equal(stars(), '⭐ 1');
    await say('Use is: My name is Reem');
    assert.match(host.querySelector('[data-testid="abboud-star-notice"]')?.textContent || '', /نجمة تصحيح! اكتشفت خطأ ريم وصحّحته: «My name is Reem»/);
    assert.equal(stars(), '⭐ 2'); assert.deepEqual(awardsOf().stars, { L1: { explain: true, correction: true } });
    const spoken = voice.mock.calls[2].arguments[0] as { speaker: string; text: string }[];
    assert.equal(spoken[1].speaker, 'sara'); assert.match(spoken[1].text, /شرحت معنى Hello بجملة واضحة\. قلتَ: «Hello greets people»\. نصيحة واحدة: اسأل سؤالاً قصيراً/);
    assert.equal(text().includes('AI summary'), false, 'the spoken and written praise is the validated one');
    assert.match(text(), /نصيحة واحدة: اسأل سؤالاً قصيراً/);
    // Replaying the same lesson cannot farm stars.
    service(lessonOne()); await click('إعادة الدرس'); await teachLessonOne();
    assert.equal(stars(), '⭐ 2'); assert.match(text(), /محسوبة لهذا الدرس من قبل/);
    assert.equal(Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).some(k => /xp|streak|certificate/i.test(k || '')), false, 'no official XP/certificate keys');
  } finally { await unmount(); }
});
test('no fake stars: invented understanding or an unrepeated fix earn nothing, though the lesson still follows the AI verdict', async () => {
  service(lessonOne({ understood: { speaker: 'badr', concept: 'Goodbye ends calls' }, repeat: 'OK teacher' })); await mount();
  try {
    await teachLessonOne();
    assert.match(text(), /اكتمل تفاعل/); assert.equal(stars(), '⭐ 0'); assert.equal(host.querySelector('[data-testid="abboud-star-notice"]'), null);
    assert.equal(awardsOf(), null);
  } finally { await unmount(); }
});
test('Badr makes the controlled error in even lessons: unverified attempt on the board, Abboud corrects it by voice for a star', async () => {
  service([
    accurate('badr', 'Is it a book red?'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Thanks! So I have a book red.' }], misconception: { incorrect: 'a book red', correct: 'a red book', reason: 'Color before noun' } },
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'I have a red book.' }, { speaker: 'sara', text: 'x' }] }
  ]);
  await mount();
  try {
    await click('الألوان والأشياء'); await say('Color first: a red book'); await say('We say a red book');
    const canvas = () => host.querySelector('[data-testid="tldraw-canvas"]')?.textContent || '';
    assert.match(canvas(), /محاولة بدر \(غير مؤكدة\) — بانتظار تصحيح عبود: a book red/); assert.equal(canvas().includes('✅'), false);
    assert.match(text(), /بدر يحاول وفي عبارته خطأ واحد صغير/);
    await say('Not a book red: the color comes first, a red book');
    assert.match(canvas(), /❌ a book red\n✅ a red book/); assert.match(text(), /اكتشفت خطأ بدر وصحّحته/);
    assert.deepEqual(awardsOf().stars, { L2: { correction: true } });
  } finally { await unmount(); }
});
async function typeTopic(value: string) {
  const input = host.querySelector('[data-testid="abboud-topic-picker"] input'); assert.ok(input instanceof dom.window.HTMLInputElement);
  const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value')!.set!;
  await act(async () => { setter.call(input, value); input.dispatchEvent(new dom.window.Event('input', { bubbles: true })); });
  await act(async () => { host.querySelector('[data-testid="abboud-topic-picker"]')!.dispatchEvent(new dom.window.Event('submit', { bubbles: true, cancelable: true })); });
}
test('«درس من اختياري»: spoken or typed topic, unsuitable topics refused gently without AI, then the same lesson path', async () => {
  const { requests } = service([accurate('badr', 'Is a ball round?')]); await mount();
  try {
    await click('درس من اختياري');
    assert.ok(host.querySelector('[data-testid="abboud-topic-picker"]')); assert.ok(button('قل موضوعك'));
    await typeTopic('الحرب'); assert.match(text(), /خلّنا نختار موضوعاً يناسب فصلنا/); assert.equal(requests.length, 0);
    await click('قل موضوعك'); await act(async () => { FakeRecognition.latest.say('كرة القدم'); }); await click('خلصت');
    assert.equal(requests.length, 0, 'the topic itself is not sent to the AI');
    assert.equal(host.querySelector('[data-testid="abboud-topic-picker"]'), null); assert.match(text(), /موضوعك: كرة القدم/);
    assert.match(host.querySelector('[data-testid="tldraw-board"]')?.textContent || '', /✨ كرة القدم/);
    await say('A ball is round');
    assert.equal(requests[0].sessionId, 16); assert.equal((requests[0] as { customTopic?: string }).customTopic, 'كرة القدم'); assert.match(text(), /Is a ball round/);
    await click('تغيير الموضوع'); assert.ok(host.querySelector('[data-testid="abboud-topic-picker"]'));
    await click('🦖 الديناصورات'); assert.match(text(), /موضوعك: الديناصورات/);
  } finally { await unmount(); }
});
test('custom lesson completes on the same path but never counts toward the fixed-lesson certificate', async () => {
  service([
    accurate('badr', 'What is a planet?'),
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'I get it: the moon goes around' }], misconception: { incorrect: 'the moon go', correct: 'the moon goes', reason: 'third person s' } },
    { verdict: 'accurate', turns: [{ speaker: 'badr', text: 'the moon goes around' }, { speaker: 'sara', text: 'x' }] }
  ]);
  mock.method(ClassroomVoice.prototype, 'play', async () => {});
  await mount();
  try {
    await click('درس من اختياري'); await typeTopic('الفضاء');
    await say('The moon goes around the earth'); await say('Yes, a planet'); await say('the moon goes, with s');
    assert.match(text(), /اكتمل تفاعل/); assert.equal(localStorage.getItem('abboud-classroom:v2:student-a'), null);
    assert.deepEqual(awardsOf().stars, { 'custom:الفضاء': { correction: true } });
    assert.match(host.querySelector('[data-testid="abboud-report-current"]')?.textContent || '', /✨ الفضاء/);
  } finally { await unmount(); }
});
test('parent summary after each lesson: explanation, English words and turns, stars, Sara tip; saved history and explicit share/copy', async () => {
  service(lessonOne()); await mount();
  const nav = globalThis.navigator as Navigator & { share?: unknown; clipboard?: unknown };
  const original = { share: nav.share, clipboard: nav.clipboard };
  try {
    assert.equal(host.querySelector('[data-testid="abboud-report"]'), null);
    await teachLessonOne();
    const card = host.querySelector('[data-testid="abboud-report-current"]')?.textContent || '';
    assert.match(card, /ماذا شرح: Hello greets people/);
    assert.match(card, /hello, greets, people, we, say, when, meet, use, is, my, name, reem/);
    assert.match(card, /تكلّم بالإنجليزي: 3 من 3/); assert.match(card, /نجوم الحصة: 2/); assert.match(card, /نصيحة سارة: اسأل سؤالاً قصيراً/);
    const saved = JSON.parse(localStorage.getItem('abboud-teacher-reports:v1:student-a') || '[]'); assert.equal(saved.length, 1); assert.equal(saved[0].stars, 2);
    const copied: string[] = [];
    Object.defineProperty(nav, 'share', { value: undefined, configurable: true });
    Object.defineProperty(nav, 'clipboard', { value: { writeText: async (t: string) => { copied.push(t); } }, configurable: true });
    await act(async () => { button('نسخ الملخص').click(); await new Promise(r => setImmediate(r)); });
    assert.equal(copied.length, 1); assert.match(copied[0], /📋 ملخص حصة «عبود المعلّم» — عبود/); assert.match(text(), /نُسخ الملخص/);
    Object.defineProperty(nav, 'clipboard', { value: undefined, configurable: true });
    await act(async () => { button('نسخ الملخص').click(); await new Promise(r => setImmediate(r)); });
    assert.match((host.querySelector('textarea[aria-label="نص الملخص للنسخ اليدوي"]') as HTMLTextAreaElement | null)?.value || '', /نجوم الحصة: 2/);
    assert.match(host.querySelector('[data-testid="abboud-report-history"]')?.textContent || '', /سجل آخر الحصص \(1\)/);
    await click('الألوان والأشياء'); assert.equal(host.querySelector('[data-testid="abboud-report-current"]'), null);
    assert.ok(host.querySelector('[data-testid="abboud-report-history"]'), 'history stays available');
  } finally {
    for (const key of ['share', 'clipboard'] as const) if (original[key] === undefined) delete (nav as unknown as Record<string, unknown>)[key]; else Object.defineProperty(nav, key, { value: original[key], configurable: true });
    await unmount();
  }
});
test('guest sessions still show the summary but persist no stars or reports', async () => {
  service(lessonOne());
  root = createRoot(host);
  await act(async () => { root.render(<AbboudTeacherActivity onClose={() => {}} />); });
  try {
    await teachLessonOne();
    assert.equal(stars(), '⭐ 2'); assert.ok(host.querySelector('[data-testid="abboud-report-current"]')); assert.match(text(), /وضع ضيف: الملخص لا يُحفظ/);
    assert.equal(localStorage.length, 0);
  } finally { await unmount(); }
});
test('15 lessons: grouped phone select, one scrollable chip row, and the certificate only after all fixed lessons', async () => {
  localStorage.setItem('abboud-classroom:v2:student-a', JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]));
  await mount();
  try {
    const select = host.querySelector('select[aria-label="اختر الدرس القصير"]'); assert.ok(select);
    assert.deepEqual(Array.from(select.querySelectorAll('optgroup')).map(g => [g.getAttribute('label'), g.querySelectorAll('option').length]), [['الأساسيات', 5], ['مواضيع جديدة', 10], ['من اختيارك', 1]]);
    assert.match(host.querySelector('[data-testid="abboud-progress"]')?.textContent || '', /📗 14\/15/);
    assert.equal(Array.from(host.querySelectorAll('button')).some(b => b.textContent?.includes('الشهادة')), false);
    await click('الأفعال اليومية'); assert.match(text(), /أنت المعلّم يا عبود/);
  } finally { await unmount(); }
  const all = readFileSync('src/index.css', 'utf8');
  assert.match(all, /\.abboud-lesson-chips \{[^}]*flex-wrap: nowrap; overflow-x: auto/);
  assert.match(all.split('@media (max-width: 639px) {')[1], /\.abboud-lesson-select \{ flex: 1 1 0%; min-width: 0; \}/);
});
test('«معلّم صغير» certificate: student name, stars, print and save as image; Escape closes it before the classroom', async () => {
  localStorage.setItem('abboud-classroom:v2:student-a', JSON.stringify(Array.from({ length: 15 }, (_, i) => i + 1)));
  localStorage.setItem('abboud-teacher-awards:v1:student-a', JSON.stringify({ stars: { L1: { explain: true, correction: true }, L2: { explain: true } }, name: 'عبود' }));
  let closed = 0, printed = 0; const drawn: string[] = []; const downloads: string[] = [];
  const proto = dom.window.HTMLCanvasElement.prototype;
  const saved = { getContext: proto.getContext, toBlob: proto.toBlob, print: dom.window.print, click: dom.window.HTMLAnchorElement.prototype.click };
  proto.getContext = (() => ({ fillRect() {}, strokeRect() {}, fillText(t: string) { drawn.push(t); } })) as never;
  proto.toBlob = function (done: BlobCallback) { done(new dom.window.Blob(['png']) as Blob); };
  dom.window.print = () => { printed++; assert.ok(document.body.classList.contains('abboud-print-certificate'), 'only the certificate prints'); };
  dom.window.HTMLAnchorElement.prototype.click = function (this: HTMLAnchorElement) { downloads.push(this.download); };
  mock.method(URL, 'createObjectURL', () => 'blob:certificate'); mock.method(URL, 'revokeObjectURL', () => {});
  root = createRoot(host);
  await act(async () => { root.render(<AbboudTeacherActivity uid="student-a" onClose={() => { closed++; }} />); });
  try {
    assert.match(host.querySelector('[data-testid="abboud-progress"]')?.textContent || '', /📗 15\/15/);
    await click('الشهادة');
    const certificate = host.querySelector('[data-testid="abboud-certificate"]'); assert.ok(certificate);
    assert.equal(host.querySelector('[data-testid="abboud-certificate-name"]')?.textContent, 'عبود');
    assert.match(certificate.textContent || '', /⭐ 3 نجمة معلّم/); assert.match(certificate.textContent || '', /ليست من شهادات الأكاديمية الرسمية/);
    const input = certificate.querySelector('input')!; const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value')!.set!;
    await act(async () => { setter.call(input, 'عبدالله'); input.dispatchEvent(new dom.window.Event('input', { bubbles: true })); });
    assert.equal(host.querySelector('[data-testid="abboud-certificate-name"]')?.textContent, 'عبدالله');
    await click('طباعة'); assert.equal(printed, 1); assert.equal(awardsOf().name, 'عبدالله');
    await act(async () => { dom.window.dispatchEvent(new dom.window.Event('afterprint')); }); assert.equal(document.body.classList.contains('abboud-print-certificate'), false);
    await click('حفظ كصورة'); assert.ok(drawn.includes('عبدالله')); assert.deepEqual(downloads, ['little-teacher-certificate.png']); assert.match(text(), /حُفظت الشهادة كصورة/);
    await act(async () => { dom.window.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'Escape' })); });
    assert.equal(host.querySelector('[data-testid="abboud-certificate"]'), null); assert.equal(closed, 0, 'Escape closed the certificate, not the classroom');
    assert.equal(Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i)).some(k => /xp|streak|certificate/i.test(k || '')), false);
  } finally {
    Object.assign(proto, { getContext: saved.getContext, toBlob: saved.toBlob }); dom.window.print = saved.print; dom.window.HTMLAnchorElement.prototype.click = saved.click;
    await unmount();
  }
});
