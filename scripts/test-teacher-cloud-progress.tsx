import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { TUTOR_TRACKS } from '../src/data/tutorTracks';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
Object.assign(dom.window.HTMLElement.prototype, { scrollIntoView() {} });
const { createRoot } = await import('react-dom/client');
const P = await import('../src/lib/tutorProgress');
const { TutorTrackPlayer } = await import('../src/components/TutorTrackPlayer');

const UID = 'stu1';
const TR = TUTOR_TRACKS[1]; // Mohammed, 60 lessons
const key = (id = TR.id) => P.tutorProgressKey(id, UID);
let reads = 0;
const cloud = (data: Record<string, unknown> | undefined) => P.setTutorCloudReaderForTests(async () => { reads++; return data; });
const offline = () => P.setTutorCloudReaderForTests(async () => { reads++; throw new Error('unavailable'); });
const reset = () => { localStorage.clear(); reads = 0; P.setTutorCloudReaderForTests(); };

test('merge rule: higher counter wins, never below 1', () => {
  assert.equal(P.mergeTutorUnlocked(5, 12), 12);
  assert.equal(P.mergeTutorUnlocked(12, 5), 12);
  assert.equal(P.mergeTutorUnlocked(undefined, undefined), 1);
  assert.equal(P.mergeTutorUnlocked('7', 'x'), 7);
  assert.equal(P.mergeTutorUnlocked(0, -3), 1);
});

test('cloud ahead of local → local cache raised to the cloud counter', async () => {
  reset(); localStorage.setItem(key(), '4'); cloud({ [TR.id]: 20 });
  assert.equal(await P.syncTutorUnlocked(TR.id, UID), 20);
  assert.equal(localStorage.getItem(key()), '20');
});

test('local ahead of cloud → local kept, nothing lowered', async () => {
  reset(); localStorage.setItem(key(), '30'); cloud({ [TR.id]: 9 });
  assert.equal(await P.syncTutorUnlocked(TR.id, UID), 30);
  assert.equal(localStorage.getItem(key()), '30');
});

test('no user → no cloud read, local as is', async () => {
  reset(); localStorage.setItem(P.tutorProgressKey(TR.id), '6'); cloud({ [TR.id]: 50 });
  assert.equal(await P.syncTutorUnlocked(TR.id), 6);
  assert.equal(reads, 0);
});

test('offline / read error / no cloud doc → local as is', async () => {
  reset(); localStorage.setItem(key(), '8'); offline();
  assert.equal(await P.syncTutorUnlocked(TR.id, UID), 8);
  cloud(undefined); assert.equal(await P.syncTutorUnlocked(TR.id, UID), 8);
  cloud({}); assert.equal(await P.syncTutorUnlocked(TR.id, UID), 8);
  cloud({ [TR.id]: 'garbage' }); assert.equal(await P.syncTutorUnlocked(TR.id, UID), 8);
  assert.equal(localStorage.getItem(key()), '8');
});

test('no data loss: other tracks and keys untouched, a lesson finished mid-read is kept', async () => {
  reset();
  localStorage.setItem(key(), '5'); localStorage.setItem(key('tutor-ali'), '40'); localStorage.setItem('sara_track_x_stu1', '77');
  P.setTutorCloudReaderForTests(async () => { localStorage.setItem(key(), '15'); return { [TR.id]: 10, 'tutor-ali': 2 }; });
  assert.equal(await P.syncTutorUnlocked(TR.id, UID), 15, 'progress made while the read was in flight wins');
  assert.equal(localStorage.getItem(key()), '15');
  assert.equal(localStorage.getItem(key('tutor-ali')), '40');
  assert.equal(localStorage.getItem('sara_track_x_stu1'), '77');
});

test('sync never writes Firebase (updateDoc/setDoc not called)', async () => {
  reset(); localStorage.setItem(key(), '3'); cloud({ [TR.id]: 25 });
  // read-only: the sync body never calls a Firestore write or the completion save
  const src = (await import('node:fs')).readFileSync(new URL('../src/lib/tutorProgress.ts', import.meta.url), 'utf8');
  const body = src.slice(src.indexOf('export async function syncTutorUnlocked'));
  assert.ok(!/updateDoc|setDoc|saveTutorUnlocked/.test(body), 'sync is read-only');
  await P.syncTutorUnlocked(TR.id, UID);
});

const host = document.getElementById('root')!;
const node = (id: string) => host.querySelector(`[data-testid="sara-map-node-${id}"]`) as HTMLButtonElement;
async function render(el: React.ReactElement, run: () => Promise<void> | void) {
  const root = createRoot(host);
  await act(async () => { root.render(el); });
  await act(async () => { await new Promise(r => setTimeout(r, 10)); });
  try { await run(); } finally { await act(async () => root.unmount()); }
}

test('map shows the cloud progress from another device', async () => {
  reset(); localStorage.setItem(key(), '2'); cloud({ [TR.id]: 18 });
  await render(<TutorTrackPlayer track={TR} uid={UID} onBack={() => {}} />, async () => {
    const l17 = TR.lessons[16], l18 = TR.lessons[17], l19 = TR.lessons[18];
    await act(async () => { (host.querySelector(`[data-testid="sara-map-tab-${l18.levelId}"]`) as HTMLButtonElement).click(); });
    assert.equal(node(l17.id).dataset.state, 'done');
    assert.equal(node(l18.id).dataset.state, 'current');
    assert.equal(node(l19.id).disabled, true);
  });
});

test('map keeps local progress when the cloud is behind or offline', async () => {
  for (const setup of [() => cloud({ [TR.id]: 3 }), offline]) {
    reset(); localStorage.setItem(key(), '18'); setup();
    await render(<TutorTrackPlayer track={TR} uid={UID} onBack={() => {}} />, async () => {
      const l18 = TR.lessons[17];
      await act(async () => { (host.querySelector(`[data-testid="sara-map-tab-${l18.levelId}"]`) as HTMLButtonElement).click(); });
      assert.equal(node(l18.id).dataset.state, 'current');
    });
    assert.equal(localStorage.getItem(key()), '18');
  }
});
