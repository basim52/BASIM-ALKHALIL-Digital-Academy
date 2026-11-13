import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { MAX_ATTEMPTS, attemptsLeft, chipLabel, firstWordChip, hintAfter, initialState, isCorrectOrder, scramble, submit, tokenize } from '../src/lib/pictureSentenceBuilder';
import { CLASSROOM_SENTENCES, PICTURE_SENTENCE_SETS, sentencesFor } from '../src/data/classroom/pictureSentences';
import { BOARD_PERSONAS } from '../src/data/saraBoardPersonas';

const words = tokenize('The boy plays football');

test('tokenize splits words and drops end punctuation', () => {
  assert.deepEqual(tokenize(' I eat rice. '), ['I', 'eat', 'rice']);
  assert.deepEqual(words, ['The', 'boy', 'plays', 'football']);
});

test('scramble is a permutation that never returns the original order', () => {
  for (let seed = 0; seed < 50; seed++) {
    let x = seed + 1; const rnd = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    const order = scramble(words, rnd);
    assert.deepEqual([...order].sort(), [0, 1, 2, 3]);
    assert.equal(isCorrectOrder(order.map(i => words[i]), words), false);
  }
  // A stuck random source still gets a changed order.
  assert.equal(isCorrectOrder(scramble(words, () => 0.999).map(i => words[i]), words), false);
});

test('order check ignores case (chips lowercase the first word)', () => {
  assert.equal(chipLabel('The', 0), 'the');
  assert.equal(chipLabel('I', 0), 'I');
  assert.equal(isCorrectOrder(['the', 'boy', 'plays', 'football'], words), true);
  assert.equal(isCorrectOrder(['boy', 'the', 'plays', 'football'], words), false);
});

test('correct on first try solves with no hint', () => {
  const r = submit(initialState(), [...words], words);
  assert.equal(r.outcome, 'correct');
  assert.deepEqual(r.state, { wrong: 0, status: 'solved', hint: 'none' });
});

test('three wrong attempts: first-word hint, then spoken, then the answer', () => {
  const wrongBuild = ['boy', 'The', 'plays', 'football'];
  let r = submit(initialState(), wrongBuild, words);
  assert.equal(r.outcome, 'wrong'); assert.equal(r.state.hint, 'first-word'); assert.equal(attemptsLeft(r.state), 2);
  r = submit(r.state, wrongBuild, words);
  assert.equal(r.outcome, 'wrong'); assert.equal(r.state.hint, 'speak'); assert.equal(attemptsLeft(r.state), 1);
  r = submit(r.state, wrongBuild, words);
  assert.equal(r.outcome, 'revealed'); assert.equal(r.state.status, 'revealed'); assert.equal(r.state.hint, 'answer');
  assert.equal(r.state.wrong, MAX_ATTEMPTS); assert.equal(attemptsLeft(r.state), 0);
  // Nothing changes after the answer is shown.
  assert.equal(submit(r.state, [...words], words).outcome, 'ignored');
});

test('correct on the third try still counts as solved', () => {
  let s = initialState();
  s = submit(s, ['boy', 'The', 'plays', 'football'], words).state;
  s = submit(s, ['football', 'The', 'plays', 'boy'], words).state;
  const r = submit(s, [...words], words);
  assert.equal(r.outcome, 'correct'); assert.equal(r.state.status, 'solved'); assert.equal(r.state.wrong, 2);
});

test('incomplete builds are not counted as attempts', () => {
  const r = submit(initialState(), ['The', 'boy'], words);
  assert.equal(r.outcome, 'ignored'); assert.equal(r.state.wrong, 0);
});

test('hintAfter and firstWordChip', () => {
  assert.deepEqual([0, 1, 2, 3].map(hintAfter), ['none', 'first-word', 'speak', 'answer']);
  assert.equal(firstWordChip(words, [2, 0, 3, 1], []), 0);
  assert.equal(firstWordChip(words, [2, 0, 3, 1], [0]), null);
  const dup = tokenize('the cat and the dog');
  assert.equal(firstWordChip(dup, [3, 1, 0, 2, 4], []), 3);
});

test('content: every class has 4 graded sets of 5 (3 → 4 → 5 → 6–7 words)', () => {
  const ids = new Set<string>();
  for (const [cid, c] of Object.entries(CLASSROOM_SENTENCES)) {
    assert.ok(c.themeAr.trim(), cid);
    assert.equal(c.sets.length, 4, cid);
    c.sets.forEach((set, si) => {
      assert.equal(set.rows.length, 5, set.id);
      for (const r of set.rows) {
        assert.ok(!ids.has(r.id), `duplicate id ${r.id}`); ids.add(r.id);
        assert.ok(r.emoji && r.ar.trim(), r.id);
        assert.doesNotMatch(r.en, /[.?!,]/, `${r.id} has punctuation`);
        const n = tokenize(r.en).length;
        if (si < 3) assert.equal(n, si + 3, `${r.id}: ${n} words`); else assert.ok(n === 6 || n === 7, `${r.id}: ${n} words`);
      }
    });
  }
});

test('content: each teacher (and Abboud\'s class) has its own sentences, none shared between classes', () => {
  const classes = [...BOARD_PERSONAS.map(p => p.id), 'abboud'];
  for (const id of classes) assert.ok(CLASSROOM_SENTENCES[id as keyof typeof CLASSROOM_SENTENCES], `missing sets for ${id}`);
  assert.equal(Object.keys(CLASSROOM_SENTENCES).length, classes.length);
  const owner = new Map<string, string>();
  for (const id of classes) for (const set of sentencesFor(id).sets) for (const r of set.rows) {
    const key = r.en.toLowerCase();
    assert.ok(!owner.has(key) || owner.get(key) === id, `«${r.en}» is in both ${owner.get(key)} and ${id}`);
    owner.set(key, id);
  }
  const themes = new Set(classes.map(id => sentencesFor(id).themeAr));
  assert.equal(themes.size, classes.length, 'every class has a distinct theme');
  assert.equal(sentencesFor('unknown'), CLASSROOM_SENTENCES.sara);
  assert.equal(PICTURE_SENTENCE_SETS, CLASSROOM_SENTENCES.sara.sets);
});

// ---------- UI (jsdom, fake voice) ----------
const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, IS_REACT_ACT_ENVIRONMENT: true });
const { createRoot } = await import('react-dom/client');
const { PictureSentenceBuilder } = await import('../src/components/PictureSentenceBuilder');

function setup() {
  const spoken: string[] = [];
  const voice = { unlock() {}, stop() {}, play: async (turns: { text: string }[]) => { spoken.push(...turns.map(t => t.text)); } };
  const host = document.getElementById('root')!;
  const root = createRoot(host);
  return { host, root, spoken, voice };
}
const chips = (host: HTMLElement) => Array.from(host.querySelectorAll<HTMLButtonElement>('[data-testid=psb-chips] button'));
async function tapWords(host: HTMLElement, seq: string[]) {
  for (const w of seq) {
    const b = chips(host).find(c => !c.disabled && c.textContent?.toLowerCase() === w.toLowerCase());
    assert.ok(b, `chip ${w}`); await act(async () => { b.click(); });
  }
}

test('UI: hidden target row, hints over 3 attempts, then the answer and Sara speaks', async () => {
  const { host, root, spoken, voice } = setup();
  await act(async () => { root.render(<PictureSentenceBuilder onClose={() => {}} voice={voice} random={() => 0.3} />); });
  assert.match(host.textContent || '', /ركّب الجملة مع سارة/);
  // Row 1 is the puzzle: its English is hidden; the other rows show theirs.
  assert.equal(host.querySelector('[data-testid=psb-row-en-1]'), null);
  assert.equal(host.querySelector('[data-testid=psb-row-en-2]')?.textContent, 'I drink water');
  assert.deepEqual(chips(host).map(c => c.textContent).sort(), ['I', 'eat', 'rice']);
  await tapWords(host, ['rice', 'eat', 'I']);
  assert.match(host.querySelector('[data-testid=psb-attempts]')!.textContent!, /2 من 3/);
  assert.equal(chips(host).find(c => c.dataset.hint === 'first')?.textContent, 'I');
  assert.equal(spoken.length, 0);
  await tapWords(host, ['eat', 'I', 'rice']);
  assert.deepEqual(spoken, ['I eat rice']);
  await tapWords(host, ['rice', 'I', 'eat']);
  assert.equal(host.querySelector('[data-testid=psb-answer]')?.textContent, 'I eat rice');
  assert.equal(host.querySelector('[data-testid=psb-row-en-1]')?.textContent, 'I eat rice');
  assert.deepEqual(spoken, ['I eat rice', 'I eat rice']);
  assert.match(host.textContent || '', /دورك: قل الجملة بصوت عالي/);
  await act(async () => root.unmount());
});

test('UI: Mohammed\'s class shows his own sentences; correct build → he reads it; whole set → done', async () => {
  const { host, root, spoken, voice } = setup();
  await act(async () => { root.render(<PictureSentenceBuilder classroomId="business" onClose={() => {}} voice={voice} teacherNameAr="محمد" teacherGender="male" voiceName="Charon" random={() => 0.3} />); });
  assert.match(host.textContent || '', /ركّب الجملة مع محمد/);
  assert.equal(host.querySelector('[data-testid=psb-theme]')?.textContent, CLASSROOM_SENTENCES.business.themeAr);
  const rows = CLASSROOM_SENTENCES.business.sets[0].rows;
  assert.equal(host.querySelector('[data-testid=psb-row-en-2]')?.textContent, rows[1].en);
  assert.notEqual(rows[1].en, CLASSROOM_SENTENCES.sara.sets[0].rows[1].en);
  for (const [i, r] of rows.entries()) {
    await tapWords(host, tokenize(r.en));
    assert.equal(spoken.at(-1), r.en);
    assert.match(host.querySelector('[data-testid=psb-notice]')!.textContent!, /وراه/);
    const next = Array.from(host.querySelectorAll('button')).find(b => /الجملة التالية|خلّصت البطاقة/.test(b.textContent || ''))!;
    await act(async () => { next.click(); });
    if (i < rows.length - 1) assert.ok(host.querySelector('[data-testid=psb-puzzle]'));
  }
  assert.ok(host.querySelector('[data-testid=psb-set-done]'));
  await act(async () => root.unmount());
});

test('UI: Abboud\'s class opens with its own lesson-topic sentences', async () => {
  const { host, root, voice } = setup();
  await act(async () => { root.render(<PictureSentenceBuilder classroomId="abboud" onClose={() => {}} voice={voice} random={() => 0.3} />); });
  assert.equal(host.querySelector('[data-testid=psb-row-en-2]')?.textContent, CLASSROOM_SENTENCES.abboud.sets[0].rows[1].en);
  await act(async () => root.unmount());
});
