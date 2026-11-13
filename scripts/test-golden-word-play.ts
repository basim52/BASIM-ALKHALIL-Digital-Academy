import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/lib/pictureSentenceBuilder';
import {
  article,
  capitalizeSentence,
  detectCategory,
  nounTemplates,
  spokenSentence,
  spinIndex,
  templatesForCard,
  withArticle,
  wordEmoji,
} from '../src/lib/goldenWordPlay';

test('wordEmoji uses the icon, then a common-word map, then ✨', () => {
  assert.equal(wordEmoji('head', '🗣️'), '🗣️');
  assert.equal(wordEmoji('head'), '🗣️');
  assert.equal(wordEmoji('eye'), '👁️');
  assert.equal(wordEmoji('hand'), '✋');
  assert.equal(wordEmoji('xyzzy'), '✨');
  assert.equal(wordEmoji('head', '🔤'), '🗣️');
});

test('a/an and uncountable/plural grammar', () => {
  assert.equal(article('head'), 'a');
  assert.equal(article('eye'), 'an');
  assert.equal(article('ear'), 'an');
  assert.equal(article('apple'), 'an');
  assert.equal(article('hair'), '');
  assert.equal(article('water'), '');
  assert.equal(article('trousers'), '');
  assert.equal(withArticle('eye'), 'an eye');
  assert.equal(withArticle('head'), 'a head');
  assert.equal(withArticle('hair'), 'hair');
  assert.equal(withArticle('rice'), 'rice');
});

test('detectCategory prefers the word, then the lesson title', () => {
  assert.equal(detectCategory('Body', 'الجسم', 'head'), 'body');
  assert.equal(detectCategory('Clothes', 'الملابس', 'shirt'), 'clothes');
  assert.equal(detectCategory('', '', 'head'), 'body');
  assert.equal(detectCategory('', '', 'pizza'), 'food');
  assert.equal(detectCategory('Body', 'الجسم', 'pizza'), 'food');
  assert.equal(detectCategory('English practice', 'تمرين', 'widget'), 'generic');
  assert.equal(detectCategory('Body', 'الجسم', 'widget'), 'body');
});

test('body templates are grammatical and include the requested frames', () => {
  const list = nounTemplates('head', 'رأس', 'body');
  const en = list.map(t => t.en);
  assert.ok(en.includes('I can touch my head'), en.join(' | '));
  assert.ok(en.includes('My cat has a big head'), en.join(' | '));
  assert.ok(en.includes('I see a head'), en.join(' | '));
  assert.ok(en.includes('My favourite word is head'), en.join(' | '));
  for (const t of list) {
    assert.ok(tokenize(t.en).includes('head'), t.en);
    assert.ok(!/[.?!]$/.test(t.en), t.en);
    assert.ok(t.ar.includes('رأس') || t.ar.length > 0, t.id);
  }
  const eye = nounTemplates('eye', 'عين', 'body').map(t => t.en);
  assert.ok(eye.includes('I see an eye'), eye.join(' | '));
  assert.ok(eye.includes('My cat has a big eye'), eye.join(' | '));
  const hair = nounTemplates('hair', 'شعر', 'body').map(t => t.en);
  assert.equal(hair.some(s => s === 'My cat has a big hair'), false);
  assert.ok(hair.includes('I can touch my hair'), hair.join(' | '));
});

test('templates stay short enough for chip building', () => {
  for (const word of ['head', 'shirt', 'apple', 'cat', 'pen', 'football']) {
    const cat = detectCategory('', '', word);
    const list = nounTemplates(word, 'س', cat);
    assert.ok(list.length >= 3, word);
    for (const t of list) {
      const n = tokenize(t.en).length;
      assert.ok(n >= 3 && n <= 8, `${t.en} has ${n} words`);
    }
  }
});

test('fav-word card uses the noun wheel; can-card keeps verb-phrase grammar', () => {
  const fav = templatesForCard({
    cardId: 'fav-word', wordEn: 'head', wordAr: 'رأس', category: 'body',
    beforeEn: 'My favourite word is ', afterEn: '.', beforeAr: 'كلمتي المفضلة هي ', afterAr: '.',
  });
  assert.ok(fav.some(t => t.en === 'I can touch my head'));
  const can = templatesForCard({
    cardId: 'can', wordEn: 'play football', wordAr: 'ألعب كرة القدم', category: 'sport',
    beforeEn: 'I can ', afterEn: '.', beforeAr: 'أنا أقدر ', afterAr: '.',
  });
  assert.ok(can.every(t => t.en.toLowerCase().includes('play football')), can.map(t => t.en).join(' | '));
  assert.equal(can.some(t => t.en.toLowerCase().includes('touch my play')), false);
});

test('spinIndex changes slot and capitalize/spoken helpers work', () => {
  assert.equal(spinIndex(1, 0), 0);
  const next = spinIndex(4, 0, () => 0); // floor(0 * 4) = 0, then fallback
  assert.notEqual(next, 0);
  assert.equal(capitalizeSentence('i like head.'), 'I like head');
  assert.equal(spokenSentence('I like head'), 'I like head.');
  assert.equal(spokenSentence('I like head.'), 'I like head.');
});
