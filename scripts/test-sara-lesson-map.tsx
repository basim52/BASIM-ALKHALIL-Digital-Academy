import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { mapNodeState, mapNodeOpen, currentLessonOrder, lessonIcon } from '../src/lib/saraLessonMap';
import { FOUNDATIONS_TRACK, type SaraTrack } from '../src/data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../src/data/saraTracks/conversation';
import { READING_TRACK } from '../src/data/saraTracks/reading';
import { WRITING_TRACK } from '../src/data/saraTracks/writing';
import { DAILY_LESSONS, DAILY_TRACK_ID } from '../src/data/saraTracks/dailyLife';
import { VOCAB_LESSONS, VOCAB_TRACK_ID } from '../src/data/saraTracks/vocabulary';
import { LISTENING_LESSONS, LISTENING_TRACK_ID } from '../src/data/saraTracks/listening';
import { PRONUNCIATION_LESSONS, PRONUNCIATION_TRACK_ID } from '../src/data/saraTracks/pronunciation';
import { FILL_BLANK_LESSONS } from '../src/data/saraTracks/fillBlank';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
const { createRoot } = await import('react-dom/client');
const { SaraLessonMap } = await import('../src/components/SaraLessonMap');
const { SaraLevelledList } = await import('../src/components/SaraLevelledList');
const { SaraFillBlankPlayer } = await import('../src/components/SaraFillBlankPlayer');

const host = document.getElementById('root')!;
const q = (sel: string) => host.querySelector(sel) as HTMLButtonElement | null;
const qa = (sel: string) => Array.from(host.querySelectorAll(sel)) as HTMLButtonElement[];
const node = (id: string) => q(`[data-testid="sara-map-node-${id}"]`)!;
async function withRoot(el: React.ReactElement, run: () => Promise<void> | void) {
  const root = createRoot(host);
  await act(async () => { root.render(el); });
  await act(async () => { await new Promise(r => setTimeout(r, 0)); });
  try { await run(); } finally { await act(async () => root.unmount()); localStorage.clear(); }
}
async function clickTab(id: string) { await act(async () => { q(`[data-testid="sara-map-tab-${id}"]`)!.click(); }); }

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

test('topic emojis fit the lesson family', () => {
  assert.equal(lessonIcon('Third Conditional'), '🔀');
  assert.equal(lessonIcon('B1 Review'), '🏆');
  assert.equal(lessonIcon('At the Airport', 0, 'conversation'), '✈️');
  assert.equal(lessonIcon('Voiceless TH', 0, 'pronunciation'), '👅');
  assert.equal(lessonIcon('Weather Report', 0, 'listening'), '🌤️');
  assert.equal(lessonIcon('Writing a CV', 0, 'writing'), '💼');
});

/** The 5 whiteboard tracks (SaraTrackPlayer) — same level split the player passes in. */
const BOARD_TRACKS: [SaraTrack, number][] = [[FOUNDATIONS_TRACK, 30], [ADVANCED_TRACK, 150], [CONVERSATION_TRACK, 150], [READING_TRACK, 150], [WRITING_TRACK, 150]];
for (const [track, total] of BOARD_TRACKS) {
  test(`whiteboard track ${track.id}: every lesson is on the map, by level`, async () => {
    assert.equal(track.lessons.length, total);
    const opened: string[] = [];
    await withRoot(<SaraLessonMap lessons={track.lessons} levels={track.levels} unlocked={34} lang="ar" trackTitleAr={track.titleAr} onOpen={l => opened.push(l.id)} />, async () => {
      const levels = track.levels?.length ? track.levels : [{ id: 'all' }];
      let seen = 0;
      for (const lv of levels) {
        if (levels.length > 1) await clickTab(lv.id);
        const nodes = qa('[data-testid^="sara-map-node-"]');
        const expected = levels.length > 1 ? track.lessons.filter(l => l.levelId === lv.id).length : track.lessons.length;
        assert.equal(nodes.length, expected, `${track.id}/${lv.id}`);
        for (const n of nodes) assert.ok((n.textContent || '').trim().length > 0, 'each node shows an emoji');
        seen += nodes.length;
      }
      assert.equal(seen, total);
      const cur = track.lessons.find(l => l.order === Math.min(34, total))!;
      if (levels.length > 1) await clickTab(cur.levelId!);
      if (total >= 34) {
        assert.equal(node(cur.id).dataset.state, 'current');
        await act(async () => { node(cur.id).click(); });
        assert.deepEqual(opened, [cur.id]);
      } else {
        assert.equal(qa('[data-state="done"]').length, 30, 'foundations finished → all done');
      }
    });
  });
}

/** Daily Life, Vocabulary, Listening, Pronunciation: the shared levelled list (level gates kept). */
const LEVELLED = [
  { key: 'daily', id: DAILY_TRACK_ID, lessons: DAILY_LESSONS },
  { key: 'vocabulary', id: VOCAB_TRACK_ID, lessons: VOCAB_LESSONS },
  { key: 'listening', id: LISTENING_TRACK_ID, lessons: LISTENING_LESSONS },
  { key: 'pronunciation', id: PRONUNCIATION_TRACK_ID, lessons: PRONUNCIATION_LESSONS },
] as const;
for (const t of LEVELLED) {
  test(`${t.key}: 120 lessons in 4 levels of 30, gates and level tests kept, progress only read`, async () => {
    assert.equal(t.lessons.length, 120);
    const opened: string[] = []; const tests: string[] = [];
    localStorage.setItem('untouched', '1');
    const before = JSON.stringify({ ...localStorage });
    await withRoot(<SaraLevelledList lessons={t.lessons as any[]} unlockedRaw={34} track={t.key} trackId={t.id} refresh={0} titleAr="x"
      onOpen={l => opened.push(l.id)} onTest={lv => tests.push(lv)} />, async () => {
      for (const lv of ['a', 'b', 'c', 'd']) { await clickTab(lv); assert.equal(qa('[data-testid^="sara-map-node-"]').length, 30, lv); }
      await clickTab('b');
      const l33 = t.lessons[32], l34 = t.lessons[33], l35 = t.lessons[34];
      assert.equal(node(l33.id).dataset.state, 'done');
      assert.equal(node(l34.id).dataset.state, 'current');
      assert.equal(node(l35.id).disabled, true);
      await act(async () => { node(l34.id).click(); node(l35.id).click(); });
      assert.deepEqual(opened, [l34.id]);
      // Level 3 stays gated behind level 2 (existing rule) and says so.
      await clickTab('c');
      assert.ok(qa('[data-testid^="sara-map-node-"]').every(b => b.disabled));
      assert.match(q('[data-testid="sara-map-level-note"]')?.textContent || '', /يفتح بعد إنهاء دروس/);
      // Level 1 is finished → its existing end-of-level test card is on the map.
      await clickTab('a');
      assert.equal(qa('[data-state="done"]').length, 30);
      assert.ok(host.textContent!.includes('اختبار'), 'end-of-level test card is reachable');
    });
    assert.equal(JSON.stringify({ ...localStorage, untouched: '1' }), before, 'the map never writes progress');
  });
}

test('Sara fill-blank: 30 lessons in 3 levels of 10 on the map', async () => {
  localStorage.setItem('sara_track_fill_blank_guest', '12');
  await withRoot(<SaraFillBlankPlayer isOpen onClose={() => {}} />, async () => {
    assert.ok(q('[data-testid="sara-lesson-map"]'));
    for (const lv of ['l1', 'l2', 'l3']) { await clickTab(lv); assert.equal(qa('[data-testid^="sara-map-node-"]').length, 10, lv); }
    await clickTab('l2');
    assert.equal(node(FILL_BLANK_LESSONS[10].id).dataset.state, 'done');
    assert.equal(node(FILL_BLANK_LESSONS[11].id).dataset.state, 'current');
    assert.equal(node(FILL_BLANK_LESSONS[12].id).disabled, true);
    assert.equal(localStorage.getItem('sara_track_fill_blank_guest'), '12');
  });
});

test('🔥 streak and free chat: shown only when available', async () => {
  let chats = 0;
  await withRoot(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={34} lang="ar" trackTitleAr="x" onOpen={() => {}} onFreeChat={() => { chats++; }} />, async () => {
    assert.equal(q('[data-testid="sara-map-streak"]'), null, 'no streak value → no 🔥 chip');
    await act(async () => { q('[data-testid="sara-map-free-chat"]')!.click(); });
    assert.equal(chats, 1);
  });
  await withRoot(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={34} lang="ar" streak={5} trackTitleAr="x" onOpen={() => {}} />, async () => {
    assert.match(q('[data-testid="sara-map-streak"]')?.textContent || '', /5/);
    assert.equal(q('[data-testid="sara-map-free-chat"]'), null);
  });
});
