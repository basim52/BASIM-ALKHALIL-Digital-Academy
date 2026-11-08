import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
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
  aborted = false;
  start() { this.onstart?.(); }
  stop() { this.onend?.(); }
  abort() { this.aborted = true; }
  say(transcript: string) {
    const event: RecognitionEvent = { resultIndex: 0, results: [{ isFinal: true, 0: { transcript } }] };
    this.onresult?.(event); this.onend?.();
  }
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
async function say(value: string) { await click('اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say(value); await new Promise(resolve => setImmediate(resolve)); }); }

test('first entry shows both students, board and mic; no writing wizard or scripted hints', async () => {
  await mount();
  try {
    assert.ok(host.querySelector('[data-testid="student-badr"]'));
    assert.ok(host.querySelector('[data-testid="student-reem"]'));
    assert.ok(host.querySelector('[aria-label="السبورة"]'));
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
    assert.match(text(), /لم يُلتقط/); assert.equal(requests.length, 0);
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
    await click('اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say('My explanation'); });
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
