import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { LINA_TRACK, TUTOR_TRACKS } from '../src/data/tutorTracks';
import { picTotal, LINA_CLASSES, LINA_HOUSE, LINA_MARKET } from '../src/data/tutorTracks/lina';
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
const settle = async () => { await act(async () => { await new Promise(r => setTimeout(r, 60)); }); };
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

test('Lina map: 8 picture classes, البيت + السوق built (20 lessons), 6 coming soon with text outlines only', () => {
  const titles = (LINA_TRACK.mapLevels || []).map(l => l.titleAr).join('|');
  for (const w of ['البيت', 'السوق', 'المدرسة', 'المغامرة', 'السفر', 'الحيوانات والطبيعة', 'المشاعر', 'المهن']) assert.ok(titles.includes(w), w);
  assert.equal(LINA_TRACK.mapLevels!.length, 8);
  assert.equal(LINA_TRACK.lessons.length, 20);
  assert.deepEqual(LINA_TRACK.lessons.map(l => l.order), Array.from({ length: 20 }, (_, i) => i + 1));
  assert.ok(LINA_MARKET.every(l => l.levelId === 'market' && l.pics));
  const soon = LINA_TRACK.comingSoon!;
  assert.equal(new Set(soon.map(l => l.levelId)).size, 6);
  assert.ok(!soon.some(l => l.levelId === 'house' || l.levelId === 'market'));
  assert.ok(soon.every(l => l.soon && !l.content && !l.pics && l.order > 100), 'outlines are text only and never opened');
});

test('Lina house + market lessons: every sentence has its own small webp picture; activities are consistent', () => {
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
  assert.equal(seen.size, 80, '40 house + 40 market pictures, none reused');
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
    assert.equal(q('[data-testid="sara-map-node-tutor-lina-11"]')?.dataset.state, 'locked', 'market opens after the house class');
    await click(q('[data-testid="sara-map-tab-school"]'));
    const nodes = qa('[data-testid^="sara-map-node-tutor-lina-soon-school"]');
    assert.equal(nodes.length, 10);
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
    await click(q('[data-testid="sara-map-tab-market"]'));
    assert.equal(q('[data-testid="sara-map-node-tutor-lina-11"]')?.dataset.state, 'current', 'existing progress (11) opens the new market class');
    await click(q('[data-testid="sara-map-tab-jobs"]'));
    assert.ok(qa('[data-testid^="sara-map-node-tutor-lina-soon-jobs"]').every(n => n.disabled));
  });
});

test('picture lesson: learn, choose, listen (text hidden), order the story, spot the mistake, say it → result + existing counter raised', async () => {
  const l = LINA_TRACK.lessons[1]; const p = l.pics!; assert.ok(!p.match, 'صباح الخير is a story lesson');
  localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '2');
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-02"]'));
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
    assert.ok(q('[data-testid="lina-listen"]'), '«اسمع واختر» step');
    assert.equal(qa('[data-testid^="lina-listen-opt-"]').length, 4);
    assert.ok(!(q('[data-testid="lina-listen"]')!.textContent || '').includes(p.scenes[p.listen!.scene].en), 'the sentence is hidden before the pick');
    await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]'));
    assert.equal(q('[data-testid="lina-listen-said"]')?.textContent, p.scenes[p.listen!.scene].en, 'shown after the pick');
    await click(q('[data-testid="lina-next"]'));
    assert.ok(!q('[data-testid="lina-match"]'), 'story lessons keep «رتّب حسب القصة»');
    assert.ok(q('[data-testid="lina-order"]'));
    const opts = qa('[data-testid^="lina-order-opt-"]').map(b => b.dataset.testid);
    assert.notDeepEqual(opts, p.scenes.map((_, i) => `lina-order-opt-${i}`), 'story starts shuffled');
    for (let i = 0; i < p.scenes.length; i++) await click(q(`[data-testid="lina-order-opt-${i}"]`));
    assert.match(q('[data-testid="lina-order-result"]')?.textContent || '', /صح/);
    await click(q('[data-testid="lina-next"]'));
    assert.ok(q('[data-testid="lina-wrong"]'));
    assert.match(q('[data-testid="lina-wrong-img"]')?.className || '', /object-contain/);
    await click(q('[data-testid="lina-wrong-word-0"][data-bad="1"], [data-bad="1"]'));
    assert.match(q('[data-testid="lina-wrong-fix"]')?.textContent || '', /teeth/);
    await click(q('[data-testid="lina-next"]')); await settle();
    assert.ok(q('[data-testid="lina-say"]'), '«قلها بصوتك» step');
    assert.equal(q('[data-testid="lina-say-sentence"]')?.textContent, p.scenes[p.say!].en);
    assert.ok(q('[data-testid="lina-say-unsupported"]'), 'no speech recognition here → a short note, never stuck');
    assert.ok(!(q('[data-testid="lina-next"]') as HTMLButtonElement).disabled, 'Next always on (skip allowed)');
    await click(q('[data-testid="lina-next"]'));
    assert.equal(picTotal(p), 5);
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p)} من ${picTotal(p)} صح`);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '3', 'same tutor counter as the other teachers');
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
  localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '2');
  const l = LINA_TRACK.lessons[1]; const p = l.pics!;
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-02"]'));
    for (let i = 0; i < p.scenes.length; i++) await click(q('[data-testid="lina-next"]'));
    for (let n = 0; n < p.choose.length; n++) { await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`)); await click(q('[data-testid="lina-next"]')); }
    await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]')); await click(q('[data-testid="lina-next"]'));
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
    assert.equal(next.textContent, 'التالي'); assert.ok(!(q('[data-testid="lina-next"]') as HTMLButtonElement).disabled);
    await click(q('[data-testid="lina-next"]')); await settle();
    const sayStep = q('[data-testid="lina-say"]')!; assert.ok(sayStep);
    assert.match(sayStep.className, /overflow-y-auto/);
    assert.match(q('[data-testid="lina-next"]')!.parentElement!.className, /sticky bottom-0/, '«النتيجة» pinned on the say step too');
    assert.equal(q('[data-testid="lina-next"]')!.textContent, 'النتيجة');
    await click(q('[data-testid="lina-next"]'));
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p) - 1} من ${picTotal(p)} صح`);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '3');
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
    const l = LINA_TRACK.lessons[1]; const p = l.pics!;
    localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '2');
    await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
      await click(q('[data-testid="sara-map-node-tutor-lina-02"]'));
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
      const { pic: lp, side: ls } = splitOk('lina-listen');
      assert.equal(lp.querySelectorAll('[data-testid^="lina-listen-opt-"]').length, 4, '4 pictures | hear-again button beside them');
      assert.ok(ls.querySelector('[data-testid="lina-listen-again"]'));
      await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]'));
      await click(q('[data-testid="lina-next"]'));
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
      await click(q('[data-testid="lina-next"]')); await settle();
      const { pic: sp, side: ss } = splitOk('lina-say');
      assert.ok(sp.querySelector('[data-testid="lina-say-img"]')); assert.ok(ss.querySelector('[data-testid="lina-say-box"]'), 'mic box beside the picture');
      await click(q('[data-testid="lina-next"]'));
      const rs = q('[data-testid="tutor-result-screen"]')!;
      assert.equal(rs.dataset.layout, 'split', 'result screen: score | next steps side by side');
      assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p)} من ${picTotal(p)} صح`);
      assert.ok(rs.querySelector('[data-testid="tutor-next-lesson"]'), 'next-lesson button on screen');
      assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '3', 'same counter as portrait');
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

test('«وصّل الصورة بجملتها» replaces «رتّب حسب القصة» only in the 5 house lessons without a story', () => {
  const match = LINA_HOUSE.filter(l => l.pics!.match).map(l => l.titleAr);
  assert.deepEqual(match, ['غرف البيت', 'الفطور', 'ننظف البيت', 'في الصالة', 'العشا مع العائلة']);
  for (const l of LINA_TRACK.lessons) {
    const p = l.pics!;
    assert.ok(p.listen && p.say != null, `${l.id}: listen + say steps`);
    assert.ok(!p.choose.includes(p.listen!.scene), `${l.id}: listen asks a sentence «اختر» didn't`);
    const cls = [...LINA_HOUSE, ...LINA_MARKET].filter(x => x.levelId === l.levelId && x.id !== l.id).flatMap(x => x.pics!.scenes.map(s => s.img));
    assert.equal(new Set(p.listen!.decoys.map(d => d.img)).size, 3);
    assert.ok(p.listen!.decoys.every(d => cls.includes(d.img)), `${l.id}: decoys come from other lessons of the same class`);
  }
});

test('matching game: tap picture → sentence; a wrong pair shows a hint, all 4 matched finishes (no mistake = 1 point)', async () => {
  const p = LINA_TRACK.lessons[0].pics!; assert.ok(p.match);
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-node-tutor-lina-01"]'));
    for (let i = 0; i < 4; i++) await click(q('[data-testid="lina-next"]'));
    for (let n = 0; n < p.choose.length; n++) { await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`)); await click(q('[data-testid="lina-next"]')); }
    await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]')); await click(q('[data-testid="lina-next"]'));
    assert.ok(q('[data-testid="lina-match"]') && !q('[data-testid="lina-order"]'));
    assert.ok((q('[data-testid="lina-next"]') as HTMLButtonElement).disabled, 'Next waits for all pairs');
    await click(q('[data-testid="lina-match-pic-0"]')); await click(q('[data-testid="lina-match-sen-2"]'));
    assert.ok(q('[data-testid="lina-match-miss"]'), 'wrong pair → hint');
    assert.equal(q('[data-testid="lina-match-pic-0"]')!.dataset.matched, '0');
    for (let i = 0; i < 4; i++) { await click(q(`[data-testid="lina-match-sen-${i}"]`)); await click(q(`[data-testid="lina-match-pic-${i}"]`)); } // sentence first works too
    assert.equal(qa('[data-matched="1"]').length, 8);
    assert.ok(q('[data-testid="lina-match-done"]'));
    await click(q('[data-testid="lina-next"]'));
    assert.ok(q('[data-testid="lina-wrong"]'));
    await click(q('[data-bad="1"]')); await click(q('[data-testid="lina-next"]')); await settle();
    await click(q('[data-testid="lina-next"]'));
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p) - 1} من ${picTotal(p)} صح`, 'the mistake in «وصّل» costs its point');
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '2');
  });
});

test('badge + end-of-class story: finishing lesson 10 earns «شارة البيت» (from the existing counter), story = 4 pictures + 2 questions', async () => {
  localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '10');
  const house = LINA_CLASSES[0]; const p = LINA_TRACK.lessons[9].pics!;
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    assert.equal(q('[data-testid="lina-badge-house"]')?.dataset.earned, '0');
    assert.match(q('[data-testid="lina-badge-house"]')?.textContent || '', /9\/10/);
    assert.ok((q('[data-testid="lina-story-open-house"]') as HTMLButtonElement).disabled, 'story locked until the class is done');
    await click(q('[data-testid="sara-map-node-tutor-lina-10"]'));
    for (let i = 0; i < 4; i++) await click(q('[data-testid="lina-next"]'));
    for (let n = 0; n < p.choose.length; n++) { await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`)); await click(q('[data-testid="lina-next"]')); }
    await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]')); await click(q('[data-testid="lina-next"]'));
    for (let i = 0; i < 4; i++) await click(q(`[data-testid="lina-order-opt-${i}"]`));
    await click(q('[data-testid="lina-next"]')); await click(q('[data-bad="1"]')); await click(q('[data-testid="lina-next"]')); await settle();
    await click(q('[data-testid="lina-next"]'));
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '11');
    assert.ok(q('[data-testid="lina-class-done"]'), 'badge banner on the last lesson\'s result');
    await click(q('[data-testid="lina-class-story"]'));
    for (let i = 0; i < 4; i++) {
      assert.equal(q('[data-testid="lina-story-img"]')?.getAttribute('src'), house.story.pages[i].img);
      assert.ok(fs.existsSync(`public${house.story.pages[i].img}`), 'story reuses existing house pictures');
      await click(q('[data-testid="lina-story-next"]'));
    }
    for (let i = 0; i < 2; i++) { assert.ok((q('[data-testid="lina-story-next"]') as HTMLButtonElement).disabled); await click(q('[data-testid^="lina-story-opt-"][data-correct="1"]')); await click(q('[data-testid="lina-story-next"]')); }
    assert.match(q('[data-testid="lina-story-score"]')?.textContent || '', /2 من 2/);
    assert.ok(q('[data-testid="lina-story-badge"]'));
    await click(q('[data-testid="lina-story-next"]'));
    assert.ok(q('[data-testid="tutor-lessons"]'), 'back on the map');
    await click(q('[data-testid="sara-map-tab-house"]'));
    assert.equal(q('[data-testid="lina-badge-house"]')?.dataset.earned, '1', 'badge shown on Lina\'s map');
    assert.ok(!(q('[data-testid="lina-story-open-house"]') as HTMLButtonElement).disabled);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '11', 'the story never changes progress');
    const keys = Object.keys(localStorage).sort();
    assert.deepEqual(keys.filter(k => /lina/.test(k)), ['lina_story_house_guest', 'tutor_track_tutor-lina_guest'], 'only the existing counter + a local «story seen» flag');
  });
});

test('market class: 10 new lessons with their own pictures; a market match lesson finishes and saves', async () => {
  assert.deepEqual(LINA_MARKET.filter(l => l.pics!.match).map(l => l.titleEn), ['The Fruit Shop', 'The Vegetable Shop', 'The Toy Shop']);
  for (const l of LINA_MARKET) for (const s of l.pics!.scenes) assert.match(s.img, /^\/lina\/market\/m\d\d-[1-4]\.webp$/);
  localStorage.setItem(tutorProgressKey(LINA_TRACK.id), '13');
  const p = LINA_MARKET[2].pics!;
  await withRoot(<TutorTrackPlayer track={LINA_TRACK} onBack={() => {}} />, async () => {
    await click(q('[data-testid="sara-map-tab-market"]'));
    await click(q('[data-testid="sara-map-node-tutor-lina-13"]'));
    for (let i = 0; i < 4; i++) await click(q('[data-testid="lina-next"]'));
    for (let n = 0; n < p.choose.length; n++) { await click(q(`[data-testid="lina-choose-opt-${p.choose[n]}"]`)); await click(q('[data-testid="lina-next"]')); }
    await click(q('[data-testid^="lina-listen-opt-"][data-correct="1"]')); await click(q('[data-testid="lina-next"]'));
    for (let i = 0; i < 4; i++) { await click(q(`[data-testid="lina-match-pic-${i}"]`)); await click(q(`[data-testid="lina-match-sen-${i}"]`)); }
    await click(q('[data-testid="lina-next"]')); await click(q('[data-bad="1"]')); await click(q('[data-testid="lina-next"]')); await settle();
    await click(q('[data-testid="lina-next"]'));
    assert.equal(q('[data-testid="tutor-result"]')?.textContent, `جاوبت ${picTotal(p)} من ${picTotal(p)} صح`);
    assert.equal(localStorage.getItem(tutorProgressKey(LINA_TRACK.id)), '14');
  });
});

test('Lina «قلها بصوتك»: parent consent card first; the mic never starts before consent; skip never blocks; card returns if storage is cleared', async () => {
  const { default: LinaSayIt, LINA_MIC_CONSENT_KEY } = await import('../src/components/LinaSayIt');
  let made = 0, started = 0;
  class FakeSR { lang = ''; interimResults = false; continuous = false; maxAlternatives = 1; onresult: unknown = null; onerror: unknown = null; onend: unknown = null; onstart: unknown = null;
    constructor() { made++; } start() { started++; } stop() {} abort() {} }
  (window as any).webkitSpeechRecognition = FakeSR;
  const el = <LinaSayIt sentence="This is the kitchen." t={(ar: string) => ar} accent="#F97316" say={() => {}} stop={() => {}} />;
  try {
    localStorage.clear();
    await withRoot(el, async () => {
      assert.ok(q('[data-testid="lina-mic-consent"]'), 'consent card shows first');
      assert.match(q('[data-testid="lina-mic-consent-text"]')!.textContent!, /Google/);
      assert.equal(q('[data-testid="lina-say-mic"]'), null, 'no mic button before consent');
      await click(q('[data-testid="lina-mic-skip"]'));
      assert.ok(q('[data-testid="lina-say-skipped"]'), 'skip → short note, the lesson goes on');
      assert.equal(localStorage.getItem(LINA_MIC_CONSENT_KEY), null, 'skipping is not consent');
      await click(q('[data-testid="lina-consent-reopen"]'));
      await click(q('[data-testid="lina-mic-agree"]'));
      assert.equal(localStorage.getItem(LINA_MIC_CONSENT_KEY), '1');
      assert.equal(made + started, 0, 'agreeing alone never opens the mic');
      await click(q('[data-testid="lina-say-mic"]'));
      assert.equal(started, 1, 'the mic starts only on a tap after consent');
      await click(q('[data-testid="lina-say-stop"]'));
      await click(q('[data-testid="lina-mic-withdraw"]'));
      assert.ok(q('[data-testid="lina-mic-consent"]'), 'withdrawn → card again');
      assert.equal(localStorage.getItem(LINA_MIC_CONSENT_KEY), null);
    });
    // consent given, then storage cleared → card again and no mic
    localStorage.setItem(LINA_MIC_CONSENT_KEY, '1');
    await withRoot(el, async () => { assert.ok(q('[data-testid="lina-say-mic"]'), 'remembered consent → mic button'); });
    started = 0;
    await withRoot(el, async () => { assert.ok(q('[data-testid="lina-mic-consent"]'), 'cleared storage → card again'); assert.equal(q('[data-testid="lina-say-mic"]'), null); });
    assert.equal(started, 0);
  } finally { delete (window as any).webkitSpeechRecognition; localStorage.clear(); }
});
