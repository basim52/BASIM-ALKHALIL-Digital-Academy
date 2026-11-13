import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';
import { SaraSentenceBuilder } from '../src/components/SaraSentenceBuilder';
import { readSentenceActivities } from '../src/lib/saraSentenceBuilder';
import { templatesForCard, detectCategory } from '../src/lib/goldenWordPlay';
import { tokenize } from '../src/lib/pictureSentenceBuilder';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  localStorage: dom.window.localStorage,
  IS_REACT_ACT_ENVIRONMENT: true,
});
dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent() { return false; }, media: '', onchange: null });
const { createRoot } = await import('react-dom/client');
const host = document.getElementById('root')!;
let root: Root;
const bodyVocab = [
  { en: 'head', ar: 'رأس', emoji: '🗣️' },
  { en: 'eye', ar: 'عين', emoji: '👁️' },
  { en: 'ear', ar: 'أذن', emoji: '👂' },
  { en: 'nose', ar: 'أنف', emoji: '👃' },
];
const props = {
  trackId: 'vocab-a', lessonId: 'body-10', uid: 'student-test',
  titleAr: 'الجسم', titleEn: 'Body', level: 'a1',
  vocab: bodyVocab,
  onDone: () => {}, doneLabel: 'أكمل الدرس',
  random: () => 0.3,
};

const spoken: string[] = [];
const speak = (text: string, _fail: () => void, done: () => void) => { spoken.push(text); done(); };

async function mount() {
  spoken.length = 0;
  localStorage.clear();
  root = createRoot(host);
  await act(async () => { root.render(<SaraSentenceBuilder {...props} speak={speak} />); });
}
async function unmount() { await act(async () => root.unmount()); host.innerHTML = ''; }

const chips = () => Array.from(host.querySelectorAll<HTMLButtonElement>('[data-testid=puzzle-chips] button'));
async function click(testId: string) {
  const el = host.querySelector<HTMLElement>(`[data-testid="${testId}"]`);
  assert.ok(el, `missing ${testId}`);
  await act(async () => { el.click(); });
}
async function tapWords(seq: string[]) {
  for (const w of seq) {
    const b = chips().find(c => !c.disabled && c.textContent?.toLowerCase() === w.toLowerCase());
    assert.ok(b, `chip ${w} in ${chips().map(c => c.textContent).join(',')}`);
    await act(async () => { b.click(); });
  }
}
function countText() { return host.querySelector('[data-testid=sentences-built-count]')?.textContent || ''; }
function firstBodySentence() {
  const list = templatesForCard({
    cardId: 'fav-word', wordEn: 'head', wordAr: 'رأس', category: detectCategory('Body', 'الجسم', 'head'),
    beforeEn: 'My favourite word is ', afterEn: '.', beforeAr: 'كلمتي المفضلة هي ', afterAr: '.',
  });
  // Default wheel index is 0 — first template for body+head.
  return list[0];
}

test('gift reveal shows the word emoji, then the listen button and wheel', async () => {
  await mount();
  assert.match(host.textContent || '', /ابنِ جملتك/);
  assert.ok(host.querySelector('[data-testid=golden-gift]'));
  assert.equal(host.querySelector('[data-testid=sentence-listen]'), null);
  await click('golden-gift');
  assert.equal(host.querySelector('[data-testid=golden-word-emoji]')?.textContent, '🗣️');
  assert.match(host.querySelector('[data-testid=sentence-listen]')?.textContent || '', /اسمعها بصوت سارة/);
  assert.ok(host.querySelector('[data-testid=sentence-wheel]'));
  assert.ok(host.querySelector('[data-testid=puzzle-chips]'));
  await unmount();
});

test('building the sentence increments the counter once, adds a necklace bead, and does not save yet', async () => {
  await mount();
  await click('golden-gift');
  const first = firstBodySentence();
  await tapWords(tokenize(first.en));
  assert.equal(countText(), 'بنَيت 1 جمل');
  assert.ok(host.querySelector('[data-testid=necklace-bead-head]'));
  assert.ok(spoken.some(s => s.startsWith(first.en)));
  assert.equal(readSentenceActivities('student-test').length, 0);
  const next = host.querySelector<HTMLButtonElement>('[data-testid=sentence-next]');
  assert.ok(next && !next.disabled);
  await unmount();
});

test('three wrong builds: first-word hint, Sara speaks, then the answer; counter still goes up once', async () => {
  await mount();
  await click('golden-gift');
  const first = firstBodySentence();
  const words = tokenize(first.en);
  const wrong = [...words].reverse();
  await tapWords(wrong);
  assert.equal(host.querySelector('[data-hint=first]')?.textContent?.toLowerCase(), words[0].toLowerCase() === 'i' ? 'i' : words[0].toLowerCase());
  assert.match(host.querySelector('[data-testid=puzzle-notice]')?.textContent || '', /أول كلمة/);
  await tapWords(wrong);
  assert.ok(spoken.some(s => s.startsWith(first.en)));
  spoken.length = 0;
  await tapWords(wrong);
  assert.equal(host.querySelector('[data-testid=puzzle-answer]')?.textContent, first.en);
  assert.equal(countText(), 'بنَيت 1 جمل');
  await unmount();
});

test('finish saves the same shape once; restart clears the session necklace', async () => {
  await mount();
  await click('golden-gift');
  const first = firstBodySentence();
  await tapWords(tokenize(first.en));
  // Mark remaining cards done? finish is only on last card. Walk the 5 cards:
  // After first card is done, go next, open gift, solve each.
  // To keep this test focused, jump isn't available — so walk if next exists.
  // Beginner set is 5 cards. Completing all would be long. Instead trigger finish by walking.
  let guard = 0;
  while (!host.querySelector('[data-testid=sentence-finish]') && guard < 8) {
    const next = host.querySelector<HTMLButtonElement>('[data-testid=sentence-next]');
    if (next && !next.disabled) await act(async () => { next.click(); });
    const gift = host.querySelector<HTMLElement>('[data-testid=golden-gift]');
    if (gift) await act(async () => { gift.click(); });
    const chipBtns = chips();
    if (chipBtns.length) {
      const labels = chipBtns.map(c => c.textContent || '');
      // We don't know the target easily for later cards; complete via 3 wrongs if needed?
      // Read the pattern? After reveal, solve by matching... we can read nothing until solved.
      // Use 3 reversed attempts to reveal and still count.
      const seq = [...labels].reverse();
      // 3 attempts
      for (let a = 0; a < 3 && !host.querySelector('[data-testid=puzzle-answer]'); a++) {
        await tapWords(seq);
      }
    }
    guard++;
  }
  const finishBtn = host.querySelector<HTMLButtonElement>('[data-testid=sentence-finish]');
  assert.ok(finishBtn && !finishBtn.disabled, 'finish should be enabled after last card');
  await act(async () => { finishBtn.click(); });
  assert.ok(host.querySelector('[data-testid=sentence-builder-done]'));
  const saved = readSentenceActivities('student-test');
  assert.equal(saved.length, 1);
  assert.equal(saved[0].trackId, 'vocab-a');
  assert.equal(saved[0].lessonId, 'body-10');
  assert.equal(saved[0].lessonTitleAr, 'الجسم');
  assert.equal(saved[0].sentencesBuilt, saved[0].sentences.length);
  assert.ok(saved[0].sentencesBuilt >= 1);
  assert.ok(Array.isArray(saved[0].sentences));
  assert.ok(typeof saved[0].at === 'number');
  await act(async () => { Array.from(host.querySelectorAll('button')).find(b => b.textContent?.includes('أعد بناء الجمل'))!.click(); });
  assert.equal(countText(), 'بنَيت 0 جمل');
  assert.equal(host.querySelector('[data-testid^=necklace-bead-]'), null);
  await unmount();
});
