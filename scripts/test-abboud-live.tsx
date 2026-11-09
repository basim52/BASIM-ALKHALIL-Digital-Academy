import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { JSDOM } from 'jsdom';
import { act } from 'react';
import type { Root } from 'react-dom/client';
import type { Recognition, RecognitionEvent } from '../src/lib/abboud/recognition';

// Multi-user flows run against the in-memory backend that mirrors firestore.rules (each actor gets its own view).
const dom = new JSDOM('<html><body></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, HTMLButtonElement: dom.window.HTMLButtonElement, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(dom.window, { setTimeout: (run: () => void) => { run(); return 0; }, clearTimeout: () => {} });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 16), cancelAnimationFrame: (id: ReturnType<typeof setTimeout>) => clearTimeout(id) });
const { createRoot } = await import('react-dom/client');
const live = await import('../src/lib/abboud/liveClass');
const { default: AbboudLiveClassAdmin } = await import('../src/components/AbboudLiveClassAdmin');
const { default: AbboudLiveJoin } = await import('../src/components/AbboudLiveJoin');
const { AbboudTeacherActivity } = await import('../src/components/AbboudTeacherActivity');
const { ClassroomVoice } = await import('../src/lib/abboud/voice');

class FakeRecognition implements Recognition {
  static latest: FakeRecognition;
  constructor() { FakeRecognition.latest = this; }
  lang = ''; continuous = false; interimResults = false;
  onstart: Recognition['onstart'] = null; onresult: Recognition['onresult'] = null; onerror: Recognition['onerror'] = null; onend: Recognition['onend'] = null;
  results: { isFinal: boolean; 0: { transcript: string } }[] = [];
  start() { this.onstart?.(); } stop() { this.onend?.(); } abort() {}
  say(transcript: string) { this.results = [...this.results, { isFinal: true, 0: { transcript } }]; this.onresult?.({ resultIndex: this.results.length - 1, results: this.results } as RecognitionEvent); }
}
window.SpeechRecognition = FakeRecognition;
const settle = async (ms = 0) => { await act(async () => { await new Promise(r => setTimeout(r, ms)); }); };
const PUBLISH = 800; // host publishes 700 ms after the last change
function seat() { const el = document.createElement('div'); document.body.appendChild(el); const root: Root = createRoot(el); return { el, root }; }
const buttonIn = (el: Element, label: string) => { const b = Array.from(el.querySelectorAll('button')).find(x => x.textContent?.includes(label)); assert.ok(b, `missing button ${label}`); return b as HTMLButtonElement; };
const press = async (el: Element, label: string) => { await act(async () => { buttonIn(el, label).click(); }); await settle(); };
const STUDENTS = [{ id: 'abood', displayName: 'عبود', email: 'abood@x.com' }, { id: 'salma', displayName: 'سلمى', email: 'salma@x.com' }, { id: 'hessa', displayName: 'حصة', email: 'hessa@x.com' }, { id: 'omar', displayName: 'عمر', email: 'omar@x.com' }];

test('admin picks are validated: host excluded, duplicates/invalid ids dropped, names only, at most 30', () => {
  const r = live.buildConfig('abood', ' عبود ', [{ uid: 'salma', name: 'سلمى\u202e' }, { uid: 'salma', name: 'dup' }, { uid: 'abood', name: 'self' }, { uid: 'bad/id', name: 'x' }]);
  if (r.ok === false) assert.fail(`rejected: ${r.reason}`);
  assert.deepEqual(r.config, { hostUid: 'abood', hostName: 'عبود', allowed: ['salma'], names: { salma: 'سلمى' } });
  assert.deepEqual(live.buildConfig('abood', 'a', []), { ok: false, reason: 'empty' });
  assert.deepEqual(live.buildConfig('abood', 'a', Array.from({ length: 31 }, (_, i) => ({ uid: `u${i}`, name: 'n' }))), { ok: false, reason: 'too-many' });
  assert.equal(live.cleanText('  hi\u0000 there\u200f  ', 5), 'hi th');
  const s = live.liveState({ active: false, sessionId: 'x', lessonId: 99, lessonTitle: 't', source: 's', draft: 'd', explained: ['w1', 'zz', 'e2'], speaker: 'salma' });
  assert.equal(s.speaker, '', 'no speaker when the class is not live'); assert.equal(s.lessonId, 16); assert.deepEqual(s.explained, ['w1', 'e2']);
  const state = { ...s, active: true, sessionId: 'S', speaker: 'salma' };
  const config = { hostUid: 'abood', hostName: 'عبود', allowed: ['salma', 'hessa'], names: {} };
  assert.equal(live.canPost(config, state, 'salma'), true); assert.equal(live.canPost(config, state, 'hessa'), false);
  assert.equal(live.canPost(config, { ...state, active: false }, 'salma'), false); assert.equal(live.canPost({ ...config, allowed: ['hessa'] }, state, 'salma'), false);
  const ps = [{ uid: 'hessa', sessionId: 'S', hand: true, lastSeen: 2000 }, { uid: 'omar', sessionId: 'S', hand: true, lastSeen: 1000 }, { uid: 'salma', sessionId: 'S', hand: true, lastSeen: 500 }, { uid: 'old', sessionId: 'S', hand: true, lastSeen: -200_000 }, { uid: 'x', sessionId: 'OTHER', hand: true, lastSeen: 1500 }];
  assert.deepEqual(live.raisedHands(ps, state, 3000).map(p => p.uid), ['omar', 'hessa'], 'oldest first; speaker, stale and other-session excluded');
});

test('permission model (mirrors firestore.rules): only admin configures; only the current speaker of a live class may post', async () => {
  const backend = live.createMemoryLiveBackend();
  const admin = backend.as('boss', { admin: true }), host = backend.as('abood'), salma = backend.as('salma'), omar = backend.as('omar');
  const config = { hostUid: 'abood', hostName: 'عبود', allowed: ['salma', 'hessa'], names: { salma: 'سلمى', hessa: 'حصة' } };
  await assert.rejects(host.saveConfig(config), /permission-denied/, 'the host cannot add students himself');
  await assert.rejects(salma.saveConfig({ ...config, allowed: ['salma', 'omar'] }), /permission-denied/);
  const state = live.liveState({ active: true, sessionId: 'S1', lessonId: 2, lessonTitle: '🎨 الألوان', source: '', draft: '', explained: [], speaker: '' });
  await assert.rejects(host.publishState('abood', state), /permission-denied/, 'no class until the admin creates one');
  await admin.saveConfig(config);
  await host.publishState('abood', state);
  await assert.rejects(salma.publishState('abood', { ...state, speaker: 'salma' }), /permission-denied/, 'students cannot give themselves the turn');
  await assert.rejects(host.publishState('abood', { ...state, speaker: 'omar' }), /permission-denied/, 'only allowed students can be given the turn');
  await assert.rejects(omar.join('abood', 'omar', 'S1', true), /permission-denied/, 'not on the list: cannot join');
  await assert.rejects(salma.join('abood', 'hessa', 'S1', true), /permission-denied/, 'cannot join for someone else');
  await salma.join('abood', 'salma', 'S1', true);
  await assert.rejects(host.setHand('abood', 'salma', true), /permission-denied/, 'the host may only lower hands');
  const message = { senderId: 'salma', text: 'What is blue?', via: 'text' as const, sessionId: 'S1' };
  await assert.rejects(salma.postMessage('abood', message), /permission-denied/, 'a raised hand is not permission');
  await host.publishState('abood', { ...state, speaker: 'salma' });
  await assert.rejects(backend.as('hessa').postMessage('abood', { ...message, senderId: 'salma' }), /permission-denied/, 'no forged sender');
  await assert.rejects(backend.as('hessa').postMessage('abood', { ...message, senderId: 'hessa' }), /permission-denied/, 'only the speaker');
  await assert.rejects(salma.postMessage('abood', { ...message, sessionId: 'OLD' }), /permission-denied/);
  await salma.postMessage('abood', message);
  await host.publishState('abood', { ...state, speaker: '' });
  await assert.rejects(salma.postMessage('abood', message), /permission-denied/, 'turn ended');
  let denied = false; omar.watchState('abood', () => {}, () => { denied = true; }); await settle();
  assert.equal(denied, true, 'not-allowed students cannot read the class');
  assert.equal(backend.messages.get('abood')?.length, 1);
});

test('admin section: pick the teacher and several students; only names are shared with the class', async () => {
  const backend = live.createMemoryLiveBackend();
  const { el, root } = seat();
  try {
    await act(async () => { root.render(<AbboudLiveClassAdmin students={STUDENTS} liveStore={backend.as('boss', { admin: true })} />); }); await settle();
    const select = el.querySelector('select') as HTMLSelectElement;
    await act(async () => { const setter = Object.getOwnPropertyDescriptor(dom.window.HTMLSelectElement.prototype, 'value')!.set!; setter.call(select, 'abood'); select.dispatchEvent(new dom.window.Event('change', { bubbles: true })); });
    const boxes = () => Array.from(el.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
    assert.deepEqual(boxes().map(b => b.parentElement?.textContent), ['حصة', 'سلمى', 'عمر'], 'the teacher is not offered as his own student');
    await act(async () => { boxes()[0].click(); boxes()[1].click(); });
    await press(el, 'حفظ قائمة الفصل');
    assert.deepEqual(backend.configs.get('abood'), { hostUid: 'abood', hostName: 'عبود', allowed: ['hessa', 'salma'], names: { hessa: 'حصة', salma: 'سلمى' } });
    assert.equal(JSON.stringify(backend.configs.get('abood')).includes('@'), false, 'no emails shared');
    assert.match(el.textContent || '', /تم الحفظ: 2 طالب/);
    await act(async () => { root.render(<AbboudLiveClassAdmin students={STUDENTS} liveStore={backend.as('salma')} />); }); await settle();
    await press(el, 'حفظ قائمة الفصل');
    assert.match(el.textContent || '', /لم يُحفظ/, 'a non-admin is refused honestly');
  } finally { await act(async () => root.unmount()); el.remove(); }
});

test('live class end to end: allowed students join from their devices, raise a hand, talk only when Abboud allows; Badr and Reem untouched', async () => {
  const backend = live.createMemoryLiveBackend();
  backend.configs.set('abood', { hostUid: 'abood', hostName: 'عبود', allowed: ['salma', 'hessa'], names: { salma: 'سلمى', hessa: 'حصة' } });
  const ai: { teacherSpeech: string; history: unknown[] }[] = [];
  mock.method(globalThis, 'fetch', async (url: unknown, options: RequestInit) => {
    if (String(url).includes('abboud-teacher')) { ai.push(JSON.parse(String(options.body))); return new Response(JSON.stringify({ verdict: 'accurate', turns: [{ speaker: 'badr', text: 'Is hello a greeting?' }] }), { status: 200 }); }
    return new Response('{}', { status: 503 });
  });
  mock.method(ClassroomVoice.prototype, 'play', async () => {});
  const host = seat(), salma = seat(), hessa = seat(), omar = seat();
  try {
    await act(async () => { host.root.render(<AbboudTeacherActivity uid="abood" onClose={() => {}} liveStore={backend.as('abood')} />); });
    for (const [s, id] of [[salma, 'salma'], [hessa, 'hessa'], [omar, 'omar']] as const) await act(async () => { s.root.render(<AbboudLiveJoin uid={id} liveStore={backend.as(id)} />); });
    await settle();
    assert.equal(salma.el.querySelector('[data-testid="abboud-live-join"]'), null, 'no entry before Abboud goes live');
    const toggle = host.el.querySelector('[data-testid="abboud-live-toggle"]') as HTMLButtonElement; assert.ok(toggle, '📡 appears because the admin set up a class');
    await act(async () => { toggle.click(); }); await press(host.el, 'ابدأ الفصل المباشر');
    assert.equal(backend.states.get('abood')?.active, true);
    assert.ok(salma.el.querySelector('[data-testid="abboud-live-join"]')); assert.ok(hessa.el.querySelector('[data-testid="abboud-live-join"]'));
    assert.equal(omar.el.querySelector('[data-testid="abboud-live-join"]'), null, 'students the admin did not add never see it');
    await press(salma.el, 'مباشر الآن — انضم'); await press(hessa.el, 'مباشر الآن — انضم'); await settle(20);
    const guest = (s: { el: Element }) => s.el.querySelector('[data-testid="abboud-live-guest"]') as HTMLElement;
    assert.ok(guest(salma)); assert.match(guest(salma).querySelector('[data-testid="abboud-live-board"]')?.textContent || '', /التحية والتعريف[\s\S]*Hello — مرحباً/, 'the same lesson board, on their device');
    assert.match(host.el.querySelector('[data-testid="abboud-live-here"]')?.textContent || '', /الحاضرون \(2\): (سلمى، حصة|حصة، سلمى)/);
    // Abboud's own words reach students live (while he is still talking), then the sent explanation.
    await press(host.el, 'اضغط وتحدّث'); await act(async () => { FakeRecognition.latest.say('Hello means مرحبا'); }); await settle(PUBLISH);
    assert.match(guest(salma).querySelector('[data-testid="abboud-live-words"]')?.textContent || '', /Hello means مرحبا/);
    await press(host.el, 'خلصت'); await settle(PUBLISH);
    assert.match(guest(hessa).querySelector('[data-testid="abboud-live-board"]')?.textContent || '', /✅ 👋 Hello — مرحباً/, 'board marks follow too');
    // Talking needs permission.
    assert.equal(guest(salma).querySelector('input[aria-label="اكتب سؤالك أو مشاركتك"]'), null, 'no talk controls without permission');
    await press(guest(salma), 'أبغى أتكلم');
    assert.match(host.el.textContent || '', /✋ سلمى يطلب الكلام/); assert.match(toggle.textContent || '', /✋1/);
    await press(host.el, 'ليس الآن'); await settle();
    assert.equal(buttonIn(guest(salma), 'أبغى أتكلم').getAttribute('aria-pressed'), 'false', 'declined: her hand is lowered on her device too');
    await press(guest(salma), 'أبغى أتكلم'); await press(guest(hessa), 'أبغى أتكلم');
    await press(host.el, 'اسمح لـسلمى'); await settle(PUBLISH);
    assert.match(guest(salma).textContent || '', /دورك الآن يا سلمى/);
    assert.match(guest(hessa).textContent || '', /سلمى يتكلم الآن/); assert.equal(guest(hessa).querySelector('input[aria-label="اكتب سؤالك أو مشاركتك"]'), null, 'one speaker at a time');
    const input = guest(salma).querySelector('input[aria-label="اكتب سؤالك أو مشاركتك"]') as HTMLInputElement;
    await act(async () => { Object.getOwnPropertyDescriptor(dom.window.HTMLInputElement.prototype, 'value')!.set!.call(input, 'Is hello for the morning?'); input.dispatchEvent(new dom.window.Event('input', { bubbles: true })); });
    await press(guest(salma), 'إرسال'); await settle();
    assert.match(host.el.querySelector('[data-testid="abboud-live-notice"]')?.textContent || '', /سلمى: Is hello for the morning\?/, 'Abboud sees the question at once');
    assert.match(guest(hessa).textContent || '', /سلمى: Is hello for the morning\?/, 'everyone sees the discussion');
    await assert.rejects(backend.as('hessa').postMessage('abood', { senderId: 'hessa', text: 'me too', via: 'text', sessionId: backend.states.get('abood')!.sessionId }), /permission-denied/);
    await press(host.el, 'إنهاء دوره'); await settle(PUBLISH);
    assert.equal(guest(salma).querySelector('input[aria-label="اكتب سؤالك أو مشاركتك"]'), null, 'turn over');
    assert.match(host.el.textContent || '', /✋ حصة يطلب الكلام/, 'the next raised hand is waiting');
    await press(host.el, 'اسمح لـحصة'); await settle(PUBLISH);
    await press(guest(hessa), 'تكلّم'); await act(async () => { FakeRecognition.latest.say('Can I say hi to my teacher'); }); await settle();
    await press(guest(hessa), 'خلصت — أرسل كلامي'); await settle();
    assert.deepEqual(backend.messages.get('abood')?.map(m => [m.senderId, m.via]), [['salma', 'text'], ['hessa', 'mic']], 'spoken words arrive as text for everyone');
    assert.match(guest(salma).textContent || '', /حصة: Can I say hi to my teacher/);
    // Badr and Reem: the AI only ever got Abboud's own speech; students' words never reach it.
    assert.equal(ai.length, 1); assert.equal(ai[0].teacherSpeech, 'Hello means مرحبا'); assert.equal(JSON.stringify(ai).includes('morning'), false);
    await press(guest(hessa), 'خروج'); await settle();
    assert.equal(backend.participants.get('abood')?.has('hessa'), false, 'leaving frees the seat');
    await press(host.el, 'إنهاء الفصل المباشر'); await settle();
    assert.match(guest(salma).textContent || '', /انتهى الفصل المباشر/);
    assert.equal(hessa.el.querySelector('[data-testid="abboud-live-join"]'), null, 'the entry disappears when the class ends');
  } finally {
    for (const s of [host, salma, hessa, omar]) { await act(async () => s.root.unmount()); s.el.remove(); }
    mock.restoreAll(); localStorage.clear();
  }
});

test('without an admin-created class nothing appears: Abboud\'s dock and Sara\'s class look exactly as before', async () => {
  const backend = live.createMemoryLiveBackend();
  const host = seat(), student = seat();
  try {
    await act(async () => { host.root.render(<AbboudTeacherActivity uid="abood" onClose={() => {}} liveStore={backend.as('abood')} />); });
    await act(async () => { student.root.render(<AbboudLiveJoin uid="salma" liveStore={backend.as('salma')} />); }); await settle();
    assert.equal(host.el.querySelector('[data-testid="abboud-live-toggle"]'), null);
    assert.equal(host.el.querySelector('[data-testid="abboud-dock-row"]')?.children.length, 4);
    assert.equal(student.el.innerHTML, '');
  } finally { for (const s of [host, student]) { await act(async () => s.root.unmount()); s.el.remove(); } localStorage.clear(); }
});
