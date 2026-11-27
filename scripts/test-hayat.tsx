import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { hayatBank, HAYAT_CLASSES, buildSession, countFor, MODE_KINDS, HAYAT_BEST_KEY, loadHayatEnglish, englishReady, type HayatQ } from '../src/data/hayat/questions';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(dom.window.HTMLMediaElement.prototype, { play() { return Promise.resolve(); }, pause() {}, load() {} });
const { createRoot } = await import('react-dom/client');
const { HayatSchool } = await import('../src/components/HayatSchool');

// the app fetches this static file; serve it from disk here
Object.assign(globalThis, { fetch: async (u: string) => u.startsWith('/hayat/') ? ({ ok: true, json: async () => JSON.parse(fs.readFileSync(`public${u}`, 'utf8')) }) : ({ ok: false, status: 503, headers: new Headers(), json: async () => ({}) }) });
await loadHayatEnglish();

const ALL = HAYAT_CLASSES.map(c => c.id);
const bank = hayatBank();

test('every class gives Hayat questions, and «الجميع» covers them all', () => {
  for (const c of HAYAT_CLASSES) assert.ok(bank.some(q => q.cls === c.id), `${c.nameAr} has questions`);
  assert.equal(countFor(ALL, MODE_KINDS.mixed), bank.length);
  assert.ok(bank.length > 5000);
});

test('question bank is well-formed (one right answer, no duplicates, real pictures)', () => {
  const ids = new Set<string>();
  for (const q of bank) {
    assert.ok(!ids.has(q.id), `unique id ${q.id}`); ids.add(q.id);
    if (q.kind === 'choice' || q.kind === 'picture' || q.kind === 'gap' || q.kind === 'vocab' || q.kind === 'hear') {
      assert.ok(q.correct >= 0 && q.correct < q.options.length, q.id);
      assert.equal(new Set(q.options).size, q.options.length, `distinct options ${q.id}`);
      assert.ok(q.options.length >= 2, q.id);
    }
    if (q.kind === 'gap') { assert.equal(q.masked.split('___').length, 2, q.id); assert.equal(q.masked.replace('___', q.options[q.correct]), q.en, q.id); }
    if (q.kind === 'order') assert.equal(q.words.join(' '), q.en.trim().split(/\s+/).join(' '));
    if (q.kind === 'tf') { if (q.truth) assert.equal(q.shownAr, q.trueAr); else assert.notEqual(q.shownAr, q.trueAr, q.id); }
    if (q.kind === 'vocab') assert.equal(q.options[q.correct], q.dir === 'toAr' ? q.ar : q.options[q.correct].toLowerCase() === q.en.toLowerCase() ? q.options[q.correct] : '(wrong)', q.id);
    if (q.kind === 'hear') assert.equal(q.options[q.correct], q.say, q.id);
    if (q.kind === 'listen') { assert.equal(q.options.length, 3); assert.ok(q.correct >= 0 && q.correct < 3); }
    for (const p of q.kind === 'picture' ? [q.pic] : q.kind === 'listen' ? q.options : []) {
      if (p.img) assert.ok(fs.existsSync(`public${p.img}`), `picture exists ${p.img}`); else assert.ok(p.emoji, q.id);
    }
  }
});

test('English: every class has English questions, Sara has vocab + hear + gap, and «English only» rounds are really English-worded', () => {
  const en = bank.filter(englishReady);
  assert.ok(en.length > 20000, `english-ready ${en.length}`);
  for (const c of HAYAT_CLASSES) assert.ok(countFor([c.id], MODE_KINDS.mixed, 'en') > 100, `${c.nameEn} English questions`);
  const sara = bank.filter(q => q.cls === 'sara');
  for (const k of ['vocab', 'hear', 'gap', 'picture', 'listen'] as const) assert.ok(sara.some(q => q.kind === k), `Sara has ${k}`);
  // every lesson-question stem has an English version after the static file loads (Lina keeps its Arabic phrase on purpose)
  assert.equal(bank.filter(q => q.kind === 'choice' && !q.promptEn).length, 0, 'all lesson questions have an English stem');
  for (let r = 0; r < 20; r++) for (const q of buildSession(ALL, r % 2 ? 'mixed' : 'challenge', Math.random, 30, 'en')) {
    assert.ok(englishReady(q));
    if (q.kind === 'choice') assert.ok(q.promptEn && (q.cls === 'lina' || !/[\u0600-\u06FF]/.test(q.promptEn)), q.id);
  }
  // default mixed rounds carry English-first kinds too
  let seen = 0; for (let r = 0; r < 30; r++) if (buildSession(ALL, 'mixed').some(q => q.kind === 'vocab' || q.kind === 'hear')) seen++;
  assert.ok(seen >= 20, `English-first kinds appear in ${seen}/30 default rounds`);
  assert.ok(buildSession(['sara'], 'vocab').length === 10 && buildSession(['sara'], 'hear').length === 10);
});

test('sessions: 10 questions, kinds mixed, small classes not crowded out, filter respected', () => {
  const s = buildSession(ALL, 'mixed');
  assert.equal(s.length, 10);
  assert.ok(new Set(s.map(q => q.kind)).size >= 5, 'mixed kinds');
  assert.ok(new Set(s.map(q => q.cls)).size >= 4, 'several classes');
  const only = buildSession(['lina'], 'picture');
  assert.ok(only.length > 0 && only.every(q => q.cls === 'lina' && q.kind === 'picture'));
  assert.equal(buildSession(['business'], 'picture').length, 0, 'no picture questions for Mohammed');
  assert.ok(buildSession(ALL, 'challenge').length >= 30);
});

test('Hayat never touches progress: no Firestore / XP / unlock imports in her files', () => {
  for (const f of ['src/components/HayatSchool.tsx', 'src/data/hayat/questions.ts']) {
    const code = fs.readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    const imports = [...code.matchAll(/from '([^']+)'/g)].map(m => m[1]);
    for (const i of imports) assert.doesNotMatch(i, /firebase|firestore|tutorProgress|gamify|certificate|saraProgressSync|awards/i, `${f} imports ${i}`);
    assert.doesNotMatch(code, /updateDoc|setDoc|addDoc|saveTutorUnlocked|saveUnlocked|\bxp\b/i, f);
  }
});

const host = document.getElementById('root')!;
const qa = (sel: string) => Array.from(host.querySelectorAll(sel)) as HTMLButtonElement[];
const q1 = (sel: string) => host.querySelector(sel) as HTMLElement | null;
const click = async (el: Element | null) => { assert.ok(el, 'element exists'); await act(async () => { (el as HTMLElement).click(); }); };

/** Answer the current question correctly (or wrongly). */
async function answer(q: HayatQ, right: boolean) {
  if (q.kind === 'tf') return click(q1(`[data-testid="${(q.truth === right) ? 'hayat-true' : 'hayat-false'}"]`));
  if (q.kind === 'order') {
    const want = right ? q.words : [...q.words].reverse();
    for (const w of want) { const tile = qa('[data-testid="hayat-tile"]').find(b => b.textContent === w); await click(tile!); }
    return click(q1('[data-testid="hayat-check"]'));
  }
  const opts = qa('[data-testid="hayat-option"]');
  return click(opts[right ? q.correct : (q.correct + 1) % opts.length]);
}

test('play flow: home → «الجميع» chips → mixed session → feedback → result card; only hayat_best_v1 is stored', async () => {
  localStorage.clear();
  const root = createRoot(host);
  await act(async () => { root.render(<HayatSchool />); });
  assert.ok(q1('[data-testid="hayat-home"]'));
  assert.equal(q1('[data-testid="hayat-class-all"]')!.getAttribute('aria-pressed'), 'true');
  await click(q1('[data-testid="hayat-class-lina"]'));
  assert.equal(q1('[data-testid="hayat-class-all"]')!.getAttribute('aria-pressed'), 'false');
  assert.equal(q1('[data-testid="hayat-class-lina"]')!.getAttribute('aria-pressed'), 'true');
  await click(q1('[data-testid="hayat-class-all"]'));
  assert.equal(q1('[data-testid="hayat-class-all"]')!.getAttribute('aria-pressed'), 'true');
  assert.equal(q1('[data-testid="hayat-lang-all"]')!.getAttribute('aria-pressed'), 'true');
  await click(q1('[data-testid="hayat-lang-en"]'));
  assert.equal(q1('[data-testid="hayat-lang-en"]')!.getAttribute('aria-pressed'), 'true');
  assert.match(q1('[data-testid="hayat-modes"]')!.textContent || '', /Word meaning/, 'English chip switches the wording to English');
  assert.ok(q1('[data-testid="hayat-mode-vocab"]') && q1('[data-testid="hayat-mode-hear"]'));
  await act(async () => root.unmount());

  const session = buildSession(ALL, 'mixed');
  const r2 = createRoot(host);
  await act(async () => { r2.render(<HayatSchool mockMode="mixed" mockSession={session} />); });
  for (let i = 0; i < session.length; i++) {
    assert.equal(q1('[data-testid="hayat-play"]')!.getAttribute('data-kind'), session[i].kind);
    await answer(session[i], i !== 1);
    const fb = q1('[data-testid="hayat-feedback"]')!;
    assert.equal(fb.getAttribute('data-ok'), i !== 1 ? '1' : '0', `feedback ${i} ${session[i].kind}`);
    assert.ok((fb.textContent || '').length > 5, 'feedback explains the answer');
    await click(q1('[data-testid="hayat-next"]'));
  }
  assert.ok(q1('[data-testid="hayat-result"]'), 'result card');
  assert.equal(q1('[data-testid="hayat-score"]')!.textContent, '90');
  assert.ok(q1('[data-testid="hayat-review"]'), 'misses listed with the right answer');
  assert.deepEqual(Object.keys(localStorage), [HAYAT_BEST_KEY]);
  assert.equal(JSON.parse(localStorage.getItem(HAYAT_BEST_KEY)!).mixed, 90);
  await act(async () => r2.unmount());
});

test('three wrong answers end the round early (hearts)', async () => {
  localStorage.clear();
  const session = buildSession(ALL, 'mixed');
  const root = createRoot(host);
  await act(async () => { root.render(<HayatSchool mockMode="mixed" mockSession={session} />); });
  for (let i = 0; i < 3; i++) { await answer(session[i], false); await click(q1('[data-testid="hayat-next"]')); }
  assert.ok(q1('[data-testid="hayat-result"]'));
  await act(async () => root.unmount());
});
