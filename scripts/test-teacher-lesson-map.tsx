import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { TUTOR_TRACKS } from '../src/data/tutorTracks';
import { TUTOR_FILL_BLANK_TRACKS } from '../src/data/fillBlankTracks';
import { trackFillBlankLevel, FILL_BLANK_LEVELS } from '../src/data/saraTracks/fillBlank';
import { personaById } from '../src/data/saraBoardPersonas';
import { tutorProgressKey } from '../src/lib/tutorProgress';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
Object.assign(dom.window.HTMLElement.prototype, { scrollIntoView() {} });
const { createRoot } = await import('react-dom/client');
const { TutorTrackPlayer } = await import('../src/components/TutorTrackPlayer');
const { FillBlankPlayer } = await import('../src/components/SaraFillBlankPlayer');

const host = document.getElementById('root')!;
const q = (sel: string) => host.querySelector(sel) as HTMLElement | null;
const qa = (sel: string) => Array.from(host.querySelectorAll(sel)) as HTMLButtonElement[];
const node = (id: string) => q(`[data-testid="sara-map-node-${id}"]`) as HTMLButtonElement;
async function withRoot(el: React.ReactElement, run: () => Promise<void> | void) {
  const root = createRoot(host);
  await act(async () => { root.render(el); });
  await act(async () => { await new Promise(r => setTimeout(r, 0)); });
  try { await run(); } finally { await act(async () => root.unmount()); localStorage.clear(); }
}
async function clickTab(id: string) { await act(async () => { (q(`[data-testid="sara-map-tab-${id}"]`) as HTMLButtonElement).click(); }); }
const snapshot = () => JSON.stringify(Object.fromEntries(Object.keys(localStorage).sort().map(k => [k, localStorage.getItem(k)])));

/** Saved counter for each teacher: some lessons done, current lesson in level 2 (when the track is long enough). */
for (const track of TUTOR_TRACKS) {
  const persona = personaById(track.personaId);
  test(`${persona.nameEn} (${track.id}): every lesson on the zigzag map, progress read from the saved counter only`, async () => {
    const total = track.lessons.length;
    const saved = Math.min(total, Math.max(2, Math.floor(total / 4) + 3));
    localStorage.setItem(tutorProgressKey(track.id), String(saved));
    localStorage.setItem('untouched', '1');
    const before = snapshot();
    await withRoot(<TutorTrackPlayer track={track} onBack={() => {}} />, async () => {
      assert.ok(q('[data-testid="sara-lesson-map"]'), 'the map replaces the old list');
      assert.equal(q('[data-testid="sara-map-teacher-name"]')?.textContent, persona.nameAr, "teacher's own name on top");
      assert.equal(q('[data-testid="sara-map-teacher-photo"]')?.getAttribute('src'), `/tutors/${persona.id}.webp`, "teacher's own photo on top");
      const levels = track.levels || [];
      let seen = 0;
      for (const lv of levels) {
        await clickTab(lv.id);
        const expected = track.lessons.filter(l => l.levelId === lv.id).length;
        assert.equal(qa('[data-testid^="sara-map-node-"]').length, expected, `${track.id}/${lv.id}`);
        seen += expected;
      }
      assert.equal(seen, total, 'no lesson left out of the map');
      const done = track.lessons.find(l => l.order === saved - 1)!, cur = track.lessons.find(l => l.order === saved)!, next = track.lessons.find(l => l.order === saved + 1);
      await clickTab(done.levelId!);
      assert.equal(node(done.id).dataset.state, 'done');
      await clickTab(cur.levelId!);
      assert.equal(node(cur.id).dataset.state, 'current');
      assert.equal(node(cur.id).disabled, false);
      if (next) { await clickTab(next.levelId!); assert.equal(node(next.id).disabled, true, 'later lessons stay locked'); assert.equal(node(next.id).dataset.state, 'locked'); }
      // Free chat opens this teacher's own chat.
      await act(async () => { (q('[data-testid="sara-map-free-chat"]') as HTMLButtonElement).click(); });
      assert.ok(q(`[data-testid="tutor-talk-${persona.id}"]`), 'free chat → teacher conversation');
      assert.equal(snapshot(), before, 'the map never writes progress');
    });
  });
}

test('tutor map: opening the current lesson leaves the map; a locked lesson does nothing', async () => {
  const track = TUTOR_TRACKS[0];
  localStorage.setItem(tutorProgressKey(track.id), '3');
  await withRoot(<TutorTrackPlayer track={track} onBack={() => {}} />, async () => {
    await act(async () => { node(track.lessons[3].id).click(); });
    assert.ok(q('[data-testid="sara-lesson-map"]'), 'locked lesson ignored');
    await act(async () => { node(track.lessons[2].id).click(); });
    assert.equal(q('[data-testid="sara-lesson-map"]'), null, 'current lesson opened');
    assert.equal(localStorage.getItem(tutorProgressKey(track.id)), '3', 'opening a lesson writes nothing');
  });
});

for (const track of TUTOR_FILL_BLANK_TRACKS) {
  const persona = personaById(track.personaId);
  test(`${persona.nameEn} fill-blank (${track.id}): map with the teacher's photo, levels and saved counter`, async () => {
    const LV = track.levels?.length ? track.levels : FILL_BLANK_LEVELS;
    const saved = 12;
    localStorage.setItem(tutorProgressKey(track.id), String(saved));
    await withRoot(<FillBlankPlayer isOpen onClose={() => {}} track={track} />, async () => {
      assert.ok(q('[data-testid="sara-lesson-map"]'));
      assert.equal(q('[data-testid="sara-map-teacher-name"]')?.textContent, persona.nameAr);
      assert.equal(q('[data-testid="sara-map-teacher-photo"]')?.getAttribute('src'), `/tutors/${persona.id}.webp`);
      let seen = 0;
      for (let i = 0; i < LV.length; i++) {
        const id = `l${i + 1}`;
        const expected = track.lessons.filter(l => Math.min(trackFillBlankLevel(track, l.order), LV.length) === i + 1).length;
        if (!expected) continue;
        await clickTab(id);
        assert.equal(qa('[data-testid^="sara-map-node-"]').length, expected, id);
        seen += expected;
      }
      assert.equal(seen, track.lessons.length);
      const cur = track.lessons.find(l => l.order === saved)!, done = track.lessons.find(l => l.order === saved - 1)!, next = track.lessons.find(l => l.order === saved + 1)!;
      await clickTab(`l${Math.min(trackFillBlankLevel(track, cur.order), LV.length)}`);
      assert.equal(node(cur.id).dataset.state, 'current');
      if (trackFillBlankLevel(track, done.order) === trackFillBlankLevel(track, cur.order)) assert.equal(node(done.id).dataset.state, 'done');
      if (trackFillBlankLevel(track, next.order) === trackFillBlankLevel(track, cur.order)) assert.equal(node(next.id).disabled, true);
      await act(async () => { (q('[data-testid="sara-map-free-chat"]') as HTMLButtonElement).click(); });
      assert.ok(q(`[data-testid="tutor-talk-${persona.id}"]`), 'free chat → teacher conversation (no Sara call)');
      assert.equal(localStorage.getItem(tutorProgressKey(track.id)), String(saved));
    });
  });
}
