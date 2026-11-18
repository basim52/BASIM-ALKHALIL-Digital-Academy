import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { mapNodeState, mapNodeOpen, currentLessonOrder, lessonIcon } from '../src/lib/saraLessonMap';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
const { createRoot } = await import('react-dom/client');
const { SaraLessonMap } = await import('../src/components/SaraLessonMap');

test('node state follows the existing unlock counter (done < unlocked = current < locked)', () => {
  assert.equal(mapNodeState(3, 5), 'done');
  assert.equal(mapNodeState(5, 5), 'current');
  assert.equal(mapNodeState(6, 5), 'locked');
  assert.equal(mapNodeOpen(6, 5), false);
  assert.equal(mapNodeOpen(6, 5, true), true, 'admin preview opens everything');
  assert.equal(mapNodeOpen(5, 5), true);
});

test('jump target is the first unpassed lesson, else the last', () => {
  assert.equal(currentLessonOrder([31, 32, 33], 1), 31);
  assert.equal(currentLessonOrder([31, 32, 33], 32), 32);
  assert.equal(currentLessonOrder([31, 32, 33], 99), 33);
  assert.equal(currentLessonOrder([], 1), null);
});

test('Advanced Grammar has 30 lessons per level and every lesson gets an icon', () => {
  const byLevel = new Map<string, number>();
  for (const l of ADVANCED_TRACK.lessons) byLevel.set(l.levelId, (byLevel.get(l.levelId) || 0) + 1);
  for (const lv of ADVANCED_TRACK.levels!) assert.equal(byLevel.get(lv.id), 30, lv.id);
  for (const [i, l] of ADVANCED_TRACK.lessons.entries()) assert.ok(lessonIcon(l.titleEn, i).length > 0);
  assert.equal(lessonIcon('Third Conditional'), '🔀');
  assert.equal(lessonIcon('B1 Review'), '🏆');
});

test('map renders saved progress read-only and opens the tapped lesson', async () => {
  const host = document.getElementById('root')!;
  const root = createRoot(host);
  const before = JSON.stringify({ ...localStorage });
  const opened: string[] = [];
  let chats = 0;
  // Student has passed lessons 1–33 → lesson 34 (adv-b1-04) is current.
  await act(async () => {
    root.render(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={34} lang="ar"
      trackTitleAr={ADVANCED_TRACK.titleAr} trackTitleEn={ADVANCED_TRACK.titleEn} onOpen={l => opened.push(l.id)} onFreeChat={() => { chats++; }} />);
  });
  const node = (id: string) => host.querySelector(`[data-testid="sara-map-node-${id}"]`) as HTMLButtonElement;
  // Opens on the level that holds the current lesson (B1), showing its 30 lessons.
  assert.equal(host.querySelectorAll('[data-testid^="sara-map-node-"]').length, 30);
  assert.equal(node('adv-b1-03').dataset.state, 'done');
  assert.equal(node('adv-b1-04').dataset.state, 'current');
  assert.equal(node('adv-b1-05').dataset.state, 'locked');
  assert.equal(node('adv-b1-05').disabled, true);
  assert.equal(host.querySelector('[data-testid="sara-map-streak"]'), null, 'no streak value → no 🔥 chip');
  await act(async () => { node('adv-b1-04').click(); node('adv-b1-01').click(); node('adv-b1-05').click(); });
  assert.deepEqual(opened, ['adv-b1-04', 'adv-b1-01']);
  await act(async () => { (host.querySelector('[data-testid="sara-map-free-chat"]') as HTMLButtonElement).click(); });
  assert.equal(chats, 1);
  // Switching to the Foundations tab: all 30 done.
  await act(async () => { (host.querySelector('[data-testid="sara-map-tab-a"]') as HTMLButtonElement).click(); });
  assert.equal(host.querySelectorAll('[data-state="done"]').length, 30);
  assert.equal(JSON.stringify({ ...localStorage }), before, 'the map never writes progress');
  await act(async () => { root.render(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={34} lang="ar" streak={5}
    trackTitleAr={ADVANCED_TRACK.titleAr} onOpen={() => {}} />); });
  assert.match(host.querySelector('[data-testid="sara-map-streak"]')?.textContent || '', /5/);
  await act(async () => root.unmount());
});
