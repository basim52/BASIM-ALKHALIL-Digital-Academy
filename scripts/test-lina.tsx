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
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 16), cancelAnimationFrame: (id: ReturnType<typeof setTimeout>) => clearTimeout(id) });
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
      assert.ok(fs.statSync(f).size < 200_000, `${f} too big`);
      assert.ok(s.en && s.ar, l.id);
    }
    assert.ok(p.choose.every(i => i >= 0 && i < p.scenes.length));
    const w = p.wrong; assert.ok(w.en.includes(w.bad), l.id);
    assert.equal(w.en.replace(w.bad, w.fix), p.scenes[w.scene].en, `${l.id}: fixing the wrong word gives the picture's sentence`);
    assert.deepEqual(l.content!.example.map(e => e.en), p.scenes.map(s => s.en));
  }
  assert.equal(seen.size, 40);
  for (const f of seen) {
    const b = fs.readFileSync(`public${f}`); const kind = b.toString('ascii', 12, 16);
    const [w, h] = kind === 'VP8X' ? [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
      : kind === 'VP8 ' ? [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
      : [1 + (b.readUInt32LE(21) & 0x3fff), 1 + ((b.readUInt32LE(21) >> 14) & 0x3fff)];
    assert.ok(w === h && w >= 768, `${f} is ${w}x${h}, want a square >= 768px`);
  }
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
      for (const img of qa('[data-testid^="lina-choose-opt-"] img')) assert.match(img.className, /aspect-square[^]*object-contain/, 'whole square picture, never cropped');
      assert.ok(!qa('[data-testid="lina-choose"] img').some(i => /object-cover/.test(i.className)));
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
    assert.match(q('[data-testid="lina-wrong-img"]')?.className || '', /object-contain/);
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

test('Lina animates like the other teachers: idle/talk/laugh clips (webm + mp4) for the shared TutorVideoFace', () => {
  for (const k of ['idle', 'talk', 'laugh']) for (const ext of ['webm', 'mp4']) {
    const f = `public/tutors/video/lina-${k}.${ext}`; assert.ok(fs.existsSync(f), f);
    const size = fs.statSync(f).size; assert.ok(size > 10_000 && size < 200_000, `${f}: ${size}`);
  }
});

test('picture lesson shows Lina\'s talking video face (same component as the teachers\' board)', async () => {
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
    const face = q('[data-testid="lina-face"]'); assert.ok(face);
    assert.ok(face!.querySelector('.tutor-video-face'), 'TutorVideoFace inside');
    assert.equal(face!.querySelector('.tutor-video-poster')?.getAttribute('src'), '/tutors/lina.webp');
    assert.ok(face!.querySelector('source[src="/tutors/video/lina-idle.webm"]'), 'idle loop loaded');
  });
});

// Regression («وش الغلط ويوقف»): on short Android phones the fixed-size picture + the words + the answer box pushed
// «النتيجة» below the screen inside an overflow-hidden page, so the lesson looked stuck after tapping a word.
test('«وش الغلط؟» never hides «النتيجة»: picture shrinks to fit, step scrolls, button is sticky; wrong answer still finishes and saves', async () => {
  localStorage.removeItem(tutorProgressKey(LINA_TRACK.id));
  const l = LINA_TRACK.lessons[0]; const p = l.pics!;
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
    for (let i = 0; i < p.scenes.length; i++) await click(q('[data-testid="lina-next"]'));
    for (let n = 0; n < p.choose.length; n++) { await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`)); await click(q('[data-testid="lina-next"]')); }
    for (let i = 0; i < p.scenes.length; i++) await click(q(`[data-testid="lina-order-opt-${i}"]`));
    await click(q('[data-testid="lina-next"]'));
    const step = q('[data-testid="lina-wrong"]')!; assert.ok(step);
    assert.match(step.className, /overflow-y-auto/, 'the step can scroll on short screens');
    const frame = q('[data-testid="lina-wrong-frame"]')!;
    assert.match(frame.parentElement!.className, /flex-1/, 'the picture takes only the free space');
    assert.doesNotMatch(frame.className + frame.parentElement!.className, /shrink-0|\d+vh/, 'no fixed-height picture that pushes the button away');
    const next = q('[data-testid="lina-next"]') as HTMLButtonElement;
    assert.match(next.parentElement!.className, /sticky bottom-0/, '«النتيجة» stays pinned at the bottom');
    assert.equal(next.parentElement!.parentElement, step, 'button lives inside the scrolling step');
    assert.ok(next.disabled);
    await click(q('[data-bad="0"]')); // a wrong word
    assert.ok(q('[data-testid="lina-wrong-fix"]'));
    assert.equal(next.textContent, 'النتيجة'); assert.ok(!(q('[data-testid="lina-next"]') as HTMLButtonElement).disabled);
    await click(q('[data-testid="lina-next"]'));
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p) - 1} من ${picTotal(p)} صح`);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '2');
    await click(q('[data-testid="tutor-track"] button[aria-label]'));
    assert.ok(q('[data-testid="tutor-lessons"]'), 'back on the map');
  });
});

// Tablet landscape («تابلت لازم وضعية عمودية»): every step splits into picture | sentence + buttons, so nothing
// sits below the fold; rotating switches live. matchMedia is stubbed (jsdom has no layout).
function fakeOrientation(landscape: boolean) {
  const listeners = new Set<() => void>();
  const state = { landscape };
  (dom.window as unknown as { matchMedia: unknown }).matchMedia = (query: string) => ({
    get matches() { return query.includes('landscape') && state.landscape; }, media: query,
    addEventListener: (_: string, f: () => void) => listeners.add(f), removeEventListener: (_: string, f: () => void) => listeners.delete(f),
  });
  return { rotate: async (to: boolean) => { state.landscape = to; await act(async () => { listeners.forEach(f => f()); dom.window.dispatchEvent(new dom.window.Event('resize')); }); } };
}
const splitOk = (id: string) => {
  const step = q(`[data-testid="${id}"]`)!; assert.ok(step, id);
  assert.equal(step.dataset.layout, 'split', `${id} uses two columns in landscape`);
  const pic = step.querySelector('[data-testid="lina-split-pic"]')!, side = step.querySelector('[data-testid="lina-split-side"]')!;
  assert.ok(pic && side, `${id}: picture column + side column`);
  assert.ok(side.querySelector('[data-testid="lina-next"]'), `${id}: Next/Result button lives in the side column`);
  assert.ok(!pic.querySelector('[data-testid="lina-next"]'));
  assert.match((side.querySelector('[data-testid="lina-next"]')!.parentElement!.className), /shrink-0/, 'button never shrinks away');
  return { pic, side };
};

test('tablet landscape: every Lina step is two columns (picture | sentence, words, options, button) → result split → saved → map', async () => {
  fakeOrientation(true);
  try {
    const l = LINA_TRACK.lessons[0]; const p = l.pics!;
    await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
      await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
      assert.equal(q('[data-testid="lina-picture-lesson"]')?.dataset.layout, 'split');
      assert.ok(!q('[data-testid="lesson-steps"]'), 'the شرح/تمارين strip is folded away in landscape to save height');
      for (let i = 0; i < p.scenes.length; i++) {
        const { pic, side } = splitOk('lina-pic-learn');
        assert.equal(pic.querySelector('[data-testid="lina-scene-img"]')?.getAttribute('src'), p.scenes[i].img, 'picture on one side');
        assert.match(side.querySelector('[data-testid="lina-scene-en"]')?.textContent || '', new RegExp(p.scenes[i].en.replace('.', '\\.')), 'its sentence beside it');
        await click(q('[data-testid="lina-next"]'));
      }
      for (let n = 0; n < p.choose.length; n++) {
        const { pic } = splitOk('lina-choose');
        assert.equal(pic.querySelectorAll('[data-testid^="lina-choose-opt-"]').length, 4, '4 pictures in a 2×2 square');
        assert.match(pic.querySelector('[data-testid="lina-pic-grid"]')!.className, /grid-rows-2/);
        await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`));
        await click(q('[data-testid="lina-next"]'));
      }
      const { pic: op } = splitOk('lina-order');
      assert.equal(op.querySelectorAll('[data-testid^="lina-order-opt-"]').length, 4);
      for (let i = 0; i < p.scenes.length; i++) await click(q(`[data-testid="lina-order-opt-${i}"]`));
      assert.equal(qa('[data-testid="lina-order-story"] li').length, 4, 'the story sentences appear beside the pictures');
      await click(q('[data-testid="lina-next"]'));
      const { pic: wp, side: ws } = splitOk('lina-wrong');
      assert.ok(wp.querySelector('[data-testid="lina-wrong-img"]'));
      assert.ok(ws.querySelector('[data-bad="1"]'), 'words beside the picture');
      await click(q('[data-bad="1"]'));
      assert.ok(ws.querySelector('[data-testid="lina-wrong-fix"]'));
      await click(q('[data-testid="lina-next"]'));
      const rs = q('[data-testid="tutor-result-screen"]')!;
      assert.equal(rs.dataset.layout, 'split', 'result screen: score | next steps side by side');
      assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p)} من ${picTotal(p)} صح`);
      assert.ok(rs.querySelector('[data-testid="tutor-next-lesson"]'), 'next-lesson button on screen');
      assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '2', 'same counter as portrait');
      await click(q('[data-testid="tutor-track"] button[aria-label]'));
      assert.ok(q('[data-testid="tutor-lessons"]'), 'back on the map');
    });
  } finally { delete (dom.window as unknown as { matchMedia?: unknown }).matchMedia; }
});

test('rotating the tablet switches Lina\'s layout live (portrait stack ⇄ landscape split) without losing the step', async () => {
  const o = fakeOrientation(false);
  try {
    await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
      await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
      await click(q('[data-testid="lina-next"]'));
      assert.equal(q('[data-testid="lina-picture-lesson"]')?.dataset.layout, 'stack');
      const img = q('[data-testid="lina-scene-img"]')?.getAttribute('src');
      await o.rotate(true);
      assert.equal(q('[data-testid="lina-picture-lesson"]')?.dataset.layout, 'split');
      assert.equal(q('[data-testid="lina-scene-img"]')?.getAttribute('src'), img, 'still on picture 2');
      await o.rotate(false);
      assert.equal(q('[data-testid="lina-picture-lesson"]')?.dataset.layout, 'stack');
      assert.ok(q('[data-testid="lesson-steps"]'), 'portrait keeps the steps strip');
    });
  } finally { delete (dom.window as unknown as { matchMedia?: unknown }).matchMedia; }
});
