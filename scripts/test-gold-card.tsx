import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';
import {
  GoldCard,
  GOLD_CARD_INK,
  GOLD_CARD_TONE_META,
  GOLD_CARD_TONES,
  hasCustomGoldCardSurface,
  resetGoldCardToneSequence,
  stableToneIndex,
  stripLegacyGoldCardClasses,
  toneFromIndex,
  type GoldCardTone,
} from '../src/components/ui/academy/GoldCard';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  IS_REACT_ACT_ENVIRONMENT: true,
});
const { createRoot } = await import('react-dom/client');
const host = document.getElementById('root')!;
let root: Root;

async function mount(node: React.ReactNode) {
  root = createRoot(host);
  await act(async () => {
    root.render(node);
  });
  return host.firstElementChild as HTMLElement;
}

async function unmount() {
  await act(async () => root.unmount());
  host.innerHTML = '';
}

function relativeLuminance(hex: string): number {
  const raw = hex.replace('#', '');
  const value = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
  const channel = (pair: string) => {
    const s = parseInt(pair, 16) / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = channel(value.slice(0, 2));
  const g = channel(value.slice(2, 4));
  const b = channel(value.slice(4, 6));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [light, dark] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

test('tones rotate deterministically from an index', () => {
  assert.equal(toneFromIndex(0), 'orange');
  assert.equal(toneFromIndex(1), 'purple');
  assert.equal(toneFromIndex(2), 'green');
  assert.equal(toneFromIndex(3), 'blue');
  assert.equal(toneFromIndex(4), 'orange');
  assert.equal(toneFromIndex(-1), 'blue');
});

test('stableToneIndex assigns a consecutive index per React id and keeps it', () => {
  resetGoldCardToneSequence();
  assert.equal(stableToneIndex(':r0:'), 0);
  assert.equal(stableToneIndex(':r0:'), 0);
  assert.equal(stableToneIndex(':r1:'), 1);
  assert.equal(stableToneIndex(':r2:'), 2);
  assert.equal(stableToneIndex('abc'), 3);
  assert.equal(stableToneIndex('abc'), 3);
});

test('legacy white/gold classes are stripped only when applying a tone surface', () => {
  const raw = 'p-6 md:p-8 space-y-5 bg-white border-[#C49E3A]/40 shadow-sm';
  const cleaned = stripLegacyGoldCardClasses(raw, true);
  assert.equal(cleaned.includes('bg-white'), false);
  assert.equal(cleaned.includes('border-[#C49E3A]/40'), false);
  assert.equal(cleaned.includes('shadow-sm'), false);
  assert.ok(cleaned.includes('p-6'));
  assert.equal(stripLegacyGoldCardClasses(raw, false), raw);
});

test('cream and repeated gold borders are treated as legacy, while !bg-white/5 stays custom', () => {
  const cream = stripLegacyGoldCardClasses('p-8 bg-[#fdfaf3] border border-[#C49E3A]/40', true);
  assert.equal(cream.includes('bg-[#fdfaf3]'), false);
  assert.equal(cream.includes('border-[#C49E3A]/40'), false);
  assert.equal(/(\s|^)border(\s|$)/.test(` ${cream} `), false);

  assert.equal(hasCustomGoldCardSurface('!bg-white/5 !border-[#C49E3A]/40 !text-white !p-0'), true);
  assert.equal(hasCustomGoldCardSurface('bg-red-50/70 border-red-300 text-red-900'), true);
  assert.equal(hasCustomGoldCardSurface('bg-emerald-50 border border-emerald-200'), true);
  assert.equal(hasCustomGoldCardSurface('bg-gradient-to-r from-emerald-50 via-[#fdfaf3] to-amber-50'), true);
  assert.equal(hasCustomGoldCardSurface('bg-white border-[#C49E3A]/40'), false);
  assert.equal(hasCustomGoldCardSurface('p-5 bg-[#fdfaf3]'), false);
  assert.equal(hasCustomGoldCardSurface('p-6 space-y-5'), false);
});

test('navy text meets WCAG AA (and AAA) on every tone fill', () => {
  for (const tone of GOLD_CARD_TONES) {
    const { fillStart, fillEnd } = GOLD_CARD_TONE_META[tone];
    const start = contrastRatio(GOLD_CARD_INK, fillStart);
    const end = contrastRatio(GOLD_CARD_INK, fillEnd);
    assert.ok(start >= 7, `${tone} start contrast ${start}`);
    assert.ok(end >= 7, `${tone} end contrast ${end}`);
  }
});

test('a default card uses a tone class, rounded playful surface, and a corner emoji', async () => {
  const el = await mount(
    <GoldCard tone="orange">
      <h3>Bingo</h3>
    </GoldCard>,
  );
  assert.equal(el.dataset.tone, 'orange');
  assert.ok(el.className.includes('gold-card-fun'));
  assert.ok(el.className.includes('gold-card-fun--orange'));
  const emoji = el.querySelector('[data-gold-emoji]');
  assert.ok(emoji);
  assert.equal(emoji?.getAttribute('aria-hidden'), 'true');
  assert.equal(emoji?.textContent, GOLD_CARD_TONE_META.orange.emoji);
  await unmount();
});

test('index and tone props control the colour, and emoji can be custom or hidden', async () => {
  const byIndex = await mount(<GoldCard index={2}>green</GoldCard>);
  assert.equal(byIndex.dataset.tone, 'green');
  assert.ok(byIndex.className.includes('gold-card-fun--green'));
  await unmount();

  const forced = await mount(
    <GoldCard tone="blue" index={0}>
      blue
    </GoldCard>,
  );
  assert.equal(forced.dataset.tone, 'blue');
  await unmount();

  const custom = await mount(<GoldCard tone="purple" emoji="🎮">game</GoldCard>);
  assert.equal(custom.querySelector('[data-gold-emoji]')?.textContent, '🎮');
  await unmount();

  const hidden = await mount(<GoldCard tone="purple" emoji={false}>plain</GoldCard>);
  assert.equal(hidden.querySelector('[data-gold-emoji]'), null);
  await unmount();
});

test('legacy caller classes do not keep a white or gold surface', async () => {
  const el = await mount(
    <GoldCard className="p-6 md:p-8 space-y-5 bg-white border-[#C49E3A]/40 shadow-sm" tone="orange">
      check
    </GoldCard>,
  );
  assert.equal(el.className.includes('bg-white'), false);
  assert.equal(el.className.includes('border-[#C49E3A]/40'), false);
  assert.ok(el.className.includes('gold-card-fun--orange'));
  assert.ok(el.className.includes('p-6'));
  await unmount();
});

test('semantic and dark-theme caller surfaces are preserved and not recoloured', async () => {
  const error = await mount(
    <GoldCard className="p-4 bg-red-50/70 border-red-300 text-red-900">error</GoldCard>,
  );
  assert.equal(error.dataset.tone, 'custom');
  assert.ok(error.className.includes('bg-red-50/70'));
  assert.ok(error.className.includes('border-red-300'));
  assert.ok(error.className.includes('text-red-900'));
  assert.equal(error.className.includes('gold-card-fun--orange'), false);
  await unmount();

  const dark = await mount(
    <GoldCard className="!bg-white/5 !border-[#C49E3A]/40 !text-white !p-0 overflow-hidden">room</GoldCard>,
  );
  assert.equal(dark.dataset.tone, 'custom');
  assert.ok(dark.className.includes('!bg-white/5'));
  assert.ok(dark.className.includes('!text-white'));
  assert.equal(dark.querySelector('[data-gold-emoji]'), null);
  await unmount();
});

test('clickable cards get a pointer cursor and data-testid still works', async () => {
  let clicks = 0;
  const el = await mount(
    <GoldCard data-testid="fun-card" onClick={() => { clicks += 1; }}>
      go
    </GoldCard>,
  );
  assert.equal(el.getAttribute('data-testid'), 'fun-card');
  assert.ok(el.className.includes('cursor-pointer'));
  await act(async () => { el.click(); });
  assert.equal(clicks, 1);
  await unmount();
});

test('consecutive cards without a tone prop cycle through the four colours', async () => {
  resetGoldCardToneSequence();
  await mount(
    <div>
      <GoldCard>one</GoldCard>
      <GoldCard>two</GoldCard>
      <GoldCard>three</GoldCard>
      <GoldCard>four</GoldCard>
    </div>,
  );
  const cards = Array.from(host.querySelectorAll('.gold-card-fun')) as HTMLElement[];
  const tones = cards.map((card) => card.dataset.tone as GoldCardTone);
  assert.equal(tones.length, 4);
  assert.deepEqual(new Set(tones).size, 4, `expected four distinct tones, got ${tones.join(',')}`);
  for (const tone of tones) assert.ok((GOLD_CARD_TONES as readonly string[]).includes(tone));
  await unmount();
});
