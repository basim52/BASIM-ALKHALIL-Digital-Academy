import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { LINA_TRACK, TUTOR_TRACKS } from '../src/data/tutorTracks';
import { picTotal } from '../src/data/tutorTracks/lina';
import { BOARD_PERSONAS, personaById } from '../src/data/saraBoardPersonas';
import { tutorProgressKey } from '../src/lib/tutorProgress';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
Object.assign(dom.window.HTMLElement.prototype, { scrollIntoView() {} });
const { createRoot } = await import('react-dom/client');
const { TutorTrackPlayer } = await import('../src/components/TutorTrackPlayer');

const host = document.getElementById('root')!;
const q = (sel: string) => host.querySelector(sel) as HTMLElement | null;
const qa = (sel: string) => Array.from(host.querySelectorAll(sel)) as HTMLButtonElement[];
const click = async (el: Element | null) => { assert.ok(el, 'element exists'); await act(async () => { (el as HTMLElement).click(); }); };
async function withRoot(el: React.ReactElement, run: () => Promise<void> | void) {
  const root = createRoot(host);
  await act(async () => { root.render(el); });
  await act(async () => { await new Promise(r => setTimeout(r, 0)); });
  try { await run(); } finally { await act(async () => root.unmount()); localStorage.clear(); }
}

test('Lina: new kids teacher with her own portrait and a distinct supported voice', () => {
  const p = personaById('lina');
  assert.equal(p.id, 'lina'); assert.equal(p.nameAr, 'لينا'); assert.equal(p.gender, 'female'); assert.ok(p.kids);
  assert.equal(BOARD_PERSONAS.filter(x => x.voice === p.voice).length, 1, 'no other teacher uses her voice');
  assert.match(fs.readFileSync('src/server/routes.ts', 'utf8'), new RegExp(`ALLOWED_VOICES = new Set\\(\\[[^\\]]*"${p.voice}"`), 'voice is allowed by the TTS route');
  assert.ok(fs.statSync('public/tutors/lina.webp').size < 80_000);
  assert.ok(TUTOR_TRACKS.includes(LINA_TRACK));
});

test('Lina map: 8 picture classes, البيت built (10 lessons), 7 coming soon with text outlines only', () => {
  const titles = (LINA_TRACK.mapLevels || []).map(l => l.titleAr).join('|');
  for (const w of ['البيت', 'السوق', 'المدرسة', 'المغامرة', 'السفر', 'الحيوانات والطبيعة', 'المشاعر', 'المهن']) assert.ok(titles.includes(w), w);
  assert.equal(LINA_TRACK.mapLevels!.length, 8);
  assert.equal(LINA_TRACK.lessons.length, 10);
  const soon = LINA_TRACK.comingSoon!;
  assert.equal(new Set(soon.map(l => l.levelId)).size, 7);
  assert.ok(soon.every(l => l.soon && !l.content && !l.pics && l.order > 100), 'outlines are text only and never opened');
});

test('Lina house lessons: every sentence has its own small webp picture; activities are consistent', () => {
  const seen = new Set<string>();
  for (const l of LINA_TRACK.lessons) {
    const p = l.pics!; assert.ok(p, l.id);
    assert.equal(p.scenes.length, 4, l.id);
    for (const s of p.scenes) {
      assert.ok(!seen.has(s.img), `${s.img} reused`); seen.add(s.img);
      const f = `public${s.img}`; assert.ok(fs.existsSync(f), f);
      assert.ok(fs.statSync(f).size < 80_000, `${f} too big`);
      assert.ok(s.en && s.ar, l.id);
    }
    assert.ok(p.choose.every(i => i >= 0 && i < p.scenes.length));
    const w = p.wrong; assert.ok(w.en.includes(w.bad), l.id);
    assert.equal(w.en.replace(w.bad, w.fix), p.scenes[w.scene].en, `${l.id}: fixing the wrong word gives the picture's sentence`);
    assert.deepEqual(l.content!.example.map(e => e.en), p.scenes.map(s => s.en));
  }
  assert.equal(seen.size, 40);
});

test('Lina map renders: teacher on top, 8 class tabs, coming-soon lessons locked, house lesson 1 current', async () => {
  localStorage.setItem('untouched', '1');
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    assert.equal(q('[data-testid="sara-map-teacher-name"]')?.textContent, 'لينا');
    assert.equal(q('[data-testid="sara-map-teacher-photo"]')?.getAttribute('src'), '/tutors/lina.webp');
    assert.ok(q('[data-testid="sara-map-free-chat"]'));
    for (const lv of LINA_TRACK.mapLevels!) assert.ok(q(`[data-testid="sara-map-tab-${lv.id}"]`), lv.id);
    assert.equal(q('[data-testid="sara-map-node-tutor-lina-01"]')?.dataset.state, 'current');
    await click(q('[data-testid="sara-map-tab-market"]'));
    const nodes = qa('[data-testid^="sara-map-node-tutor-lina-soon-market"]');
    assert.equal(nodes.length, 5);
    assert.ok(nodes.every(n => n.disabled && n.dataset.state === 'locked'));
    assert.match(q('[data-testid="sara-map-level-note"]')?.textContent || '', /قريباً/);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), null, 'the map writes nothing');
  });
});

test('even with the house class finished, coming-soon lessons stay locked', async () => {
  localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '11');
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-tab-house"]'));
    assert.ok(qa('[data-testid^="sara-map-node-tutor-lina-0"], [data-testid="sara-map-node-tutor-lina-10"]').every(n => n.dataset.state === 'done'));
    await click(q('[data-testid="sara-map-tab-jobs"]'));
    assert.ok(qa('[data-testid^="sara-map-node-tutor-lina-soon-jobs"]').every(n => n.disabled));
  });
});

test('picture lesson: learn the pictures, choose, order the story, spot the mistake → result + existing counter raised', async () => {
  const l = LINA_TRACK.lessons[0]; const p = l.pics!;
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
    for (let i = 0; i < p.scenes.length; i++) {
      assert.ok(q('[data-testid="lina-pic-learn"]'));
      assert.equal(q('[data-testid="lina-scene-img"]')?.getAttribute('src'), p.scenes[i].img);
      assert.match(q('[data-testid="lina-scene-en"]')?.textContent || '', new RegExp(p.scenes[i].en.replace('.', '\\.')));
      await click(q('[data-testid="lina-next"]'));
    }
    for (let n = 0; n < p.choose.length; n++) {
      assert.ok(q('[data-testid="lina-choose"]'));
      assert.equal(qa('[data-testid^="lina-choose-opt-"]').length, 4);
      await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`));
      await click(q('[data-testid="lina-next"]'));
    }
    assert.ok(q('[data-testid="lina-order"]'));
    const opts = qa('[data-testid^="lina-order-opt-"]').map(b => b.dataset.testid);
    assert.notDeepEqual(opts, p.scenes.map((_, i) => `lina-order-opt-${i}`), 'story starts shuffled');
    for (let i = 0; i < p.scenes.length; i++) await click(q(`[data-testid="lina-order-opt-${i}"]`));
    assert.match(q('[data-testid="lina-order-result"]')?.textContent || '', /صح/);
    await click(q('[data-testid="lina-next"]'));
    assert.ok(q('[data-testid="lina-wrong"]'));
    await click(q('[data-testid="lina-wrong-word-0"][data-bad="1"], [data-bad="1"]'));
    assert.match(q('[data-testid="lina-wrong-fix"]')?.textContent || '', /kitchen/);
    await click(q('[data-testid="lina-next"]'));
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p)} من ${picTotal(p)} صح`);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '2', 'same tutor counter as the other teachers');
  });
});

test('other teachers\' saved progress is untouched by Lina', async () => {
  for (const t of TUTOR_TRACKS) if (t !== LINA_TRACK) localStorage.setItem(tutorProgressKey(t.id), '7');
  const before = TUTOR_TRACKS.filter(t => t !== LINA_TRACK).map(t => localStorage.getItem(tutorProgressKey(t.id)));
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
    assert.deepEqual(TUTOR_TRACKS.filter(t => t !== LINA_TRACK).map(t => localStorage.getItem(tutorProgressKey(t.id))), before);
  });
});
