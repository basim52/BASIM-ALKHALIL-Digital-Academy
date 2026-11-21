import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import {
  flameStage, liveStreak, weekStudyDays, weeklyBadge, saraStreakLine, dayDiff, addDays,
  ROOM_ITEMS, itemUnlocked, nextUnlock, sanitizeRoom, DEFAULT_ROOM, roomKey, readAvatar, zoneFor, MAP_ZONES, weekRangeLabel,
} from '../src/lib/gamify';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';

const dom = new JSDOM('<html><body><div id="root"></div></body></html>', { url: 'http://localhost' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, localStorage: dom.window.localStorage, Audio: dom.window.Audio, Event: dom.window.Event, IS_REACT_ACT_ENVIRONMENT: true });
Object.assign(globalThis, { requestAnimationFrame: (run: FrameRequestCallback) => setTimeout(() => run(Date.now()), 0) });
const { createRoot } = await import('react-dom/client');
const { SaraLessonMap } = await import('../src/components/SaraLessonMap');
const { StudentRoom } = await import('../src/components/gamify/StudentRoom');
const { StreakSheet } = await import('../src/components/gamify/StreakSheet');
const { parentLine } = await import('../src/components/gamify/WeeklyAchievementCard');

const host = document.getElementById('root')!;
const q = (sel: string) => host.querySelector(sel) as HTMLButtonElement | null;
const qa = (sel: string) => Array.from(host.querySelectorAll(sel)) as HTMLElement[];
async function withRoot(el: React.ReactElement, run: () => Promise<void> | void) {
  const root = createRoot(host);
  await act(async () => { root.render(el); });
  await act(async () => { await new Promise(r => setTimeout(r, 0)); });
  try { await run(); } finally { await act(async () => root.unmount()); localStorage.clear(); }
}

// ───── Streak logic ─────
const TODAY = '2026-11-21'; // Saturday

test('date helpers', () => {
  assert.equal(dayDiff('2026-11-21', '2026-11-19'), 2);
  assert.equal(addDays('2026-11-30', 1), '2026-12-01');
  assert.equal(addDays('2026-03-01', -1), '2026-02-28');
});

test('streak stays alive yesterday / with a freeze, dies after a real gap', () => {
  assert.equal(liveStreak({ current: 4, lastActiveDate: TODAY }, TODAY), 4);
  assert.equal(liveStreak({ current: 4, lastActiveDate: '2026-11-20' }, TODAY), 4, 'yesterday still counts');
  assert.equal(liveStreak({ current: 4, lastActiveDate: '2026-11-19', freezesLeft: 1 }, TODAY), 4, 'one missed day covered by the freeze');
  assert.equal(liveStreak({ current: 4, lastActiveDate: '2026-11-19', freezesLeft: 0 }, TODAY), 0);
  assert.equal(liveStreak({ current: 9, lastActiveDate: '2026-11-10' }, TODAY), 0);
  assert.equal(liveStreak(null, TODAY), 0);
});

test('flame grows at 1 / 3 / 7 / 14 / 30 days', () => {
  assert.deepEqual([0, 1, 2, 3, 6, 7, 13, 14, 29, 30, 120].map(n => flameStage(n).level), [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
  assert.ok(flameStage(30).scale > flameStage(7).scale && flameStage(7).scale > flameStage(1).scale);
});

test('this week (Sun→Sat) marks exactly the streak days', () => {
  const w = weekStudyDays({ current: 3, lastActiveDate: TODAY }, TODAY);
  assert.equal(w.length, 7);
  assert.equal(w[0].date, '2026-11-15'); assert.equal(w[0].dayAr, 'أحد');
  assert.equal(w[6].date, TODAY); assert.ok(w[6].isToday);
  assert.deepEqual(w.map(d => d.studied), [false, false, false, false, true, true, true]);
  // Long streak fills the whole week; days before Sunday are not counted.
  assert.equal(weekStudyDays({ current: 40, lastActiveDate: TODAY }, TODAY).filter(d => d.studied).length, 7);
  // Mid-week: future days are flagged, never studied.
  const mid = weekStudyDays({ current: 2, lastActiveDate: '2026-11-18' }, '2026-11-18');
  assert.deepEqual(mid.map(d => d.future), [false, false, false, false, true, true, true]);
  assert.equal(mid.filter(d => d.studied).length, 2);
  assert.equal(weekStudyDays(null, TODAY).filter(d => d.studied).length, 0);
});

test('weekly badge: 3 bronze · 5 silver · 7 gold', () => {
  assert.equal(weeklyBadge(0).earned, null); assert.equal(weeklyBadge(0).next?.tier, 'bronze'); assert.equal(weeklyBadge(0).daysToNext, 3);
  assert.equal(weeklyBadge(3).earned?.tier, 'bronze'); assert.equal(weeklyBadge(4).daysToNext, 1);
  assert.equal(weeklyBadge(5).earned?.tier, 'silver');
  assert.equal(weeklyBadge(7).earned?.tier, 'gold'); assert.equal(weeklyBadge(7).next, null);
});

test('Sara encouragement lines are Arabic, kind and fit the streak', () => {
  assert.match(saraStreakLine(0, false), /نولّع الشعلة/);
  assert.match(saraStreakLine(4, false), /4 أيام/);
  assert.match(saraStreakLine(7, true), /أسبوع كامل/);
  assert.match(saraStreakLine(30, true), /شهر كامل/);
  for (const n of [0, 1, 3, 7, 14, 30]) for (const d of [true, false]) assert.doesNotMatch(saraStreakLine(n, d), /[a-z]{3,}/i);
});

// ───── Room unlocks (XP is read only) ─────
test('room items unlock at their XP threshold, and never below it', () => {
  for (const it of ROOM_ITEMS) {
    assert.equal(itemUnlocked(it.xp, it), true, `${it.id} at ${it.xp}`);
    if (it.xp > 0) assert.equal(itemUnlocked(it.xp - 1, it), false, `${it.id} below ${it.xp}`);
  }
  assert.ok(ROOM_ITEMS.filter(i => i.xp === 0).length >= 5, 'starter items for everyone');
  for (const slot of ['character', 'hat', 'pet', 'wall', 'decor']) assert.ok(ROOM_ITEMS.some(i => i.slot === slot && i.xp === 0), `free ${slot}`);
  assert.equal(new Set(ROOM_ITEMS.map(i => i.id)).size, ROOM_ITEMS.length, 'unique ids');
});

test('next unlock = cheapest locked item and the missing XP', () => {
  assert.deepEqual([nextUnlock(0)?.item.xp, nextUnlock(0)?.missing], [50, 50]);
  assert.deepEqual([nextUnlock(120)?.item.xp, nextUnlock(120)?.missing], [150, 30]);
  assert.equal(nextUnlock(1e6), null);
  assert.equal(nextUnlock(NaN as any)?.missing, 50);
});

test('saved room keeps only known + unlocked items (no spending, no XP change)', () => {
  assert.deepEqual(sanitizeRoom(null, 0), DEFAULT_ROOM);
  const saved = { character: 'ch-hero', hat: 'hat-crown', pet: 'pet-chick', wall: 'wall-nope', decor: ['dc-books', 'dc-rocket', 'dc-books', 'ch-boy'] };
  const r = sanitizeRoom(saved, 700);
  assert.deepEqual(r, { character: 'ch-hero', hat: 'hat-none', pet: 'pet-chick', wall: 'wall-sky', decor: ['dc-books'] });
  assert.equal(sanitizeRoom(saved, 5000).hat, 'hat-crown');
});

test('zones: every level is a different place, cycling after 8', () => {
  assert.deepEqual(MAP_ZONES.slice(0, 4).map(z => z.kind), ['forest', 'sea', 'mountain', 'city']);
  assert.equal(zoneFor(8).kind, 'forest');
  assert.equal(new Set(MAP_ZONES.map(z => z.kind)).size, MAP_ZONES.length);
});

test('week range label', () => {
  assert.match(weekRangeLabel(TODAY, 'en'), /15.*21 November/);
});

// ───── UI ─────
test('map: zone scene, zone tabs, walking avatar and the 🔥/🏠/🏅 row — progress & XP untouched', async () => {
  localStorage.setItem('sara_xp_probe', '123');
  const before = JSON.stringify({ ...localStorage });
  await withRoot(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={34} lang="ar" trackTitleAr="x" onOpen={() => {}} />, async () => {
    const zone = q('[data-testid="sara-map-zone"]')!;
    assert.ok(zone, 'zone backdrop drawn');
    assert.ok(q('[data-testid="gamify-bar"]'));
    assert.ok(q('[data-testid="gamify-streak"]') && q('[data-testid="gamify-room-open"]') && q('[data-testid="gamify-card-open"]'));
    const av = q('[data-testid="sara-map-avatar"]')!;
    assert.ok(av, 'avatar on the current lesson');
    assert.equal(av.dataset.walked, '0');
    await act(async () => { await new Promise(r => setTimeout(r, 500)); });
    assert.equal(q('[data-testid="sara-map-avatar"]')!.dataset.walked, '1', 'avatar walked to the current lesson');
    // Locked later level: fog + lock in the tab.
    const tabs = qa('[data-testid^="sara-map-tab-"]');
    const lastTab = tabs[tabs.length - 1];
    assert.match(lastTab.textContent || '', /🔒/);
    await act(async () => { (lastTab as HTMLButtonElement).click(); });
    assert.ok(q('[data-testid="sara-map-zone-fog"]'), 'locked zone is foggy');
    assert.equal(q('[data-testid="sara-map-avatar"]'), null, 'no avatar in a locked zone');
    assert.match(tabs[0].textContent || '', /🌳/);
  });
  assert.equal(JSON.stringify({ ...localStorage, sara_xp_probe: '123' }), before, 'map writes nothing');
});

test('map: newly opened zone says so', async () => {
  // unlocked = first lesson of level 2 → level 2 is open with nothing done yet.
  const lv2 = ADVANCED_TRACK.lessons.find(l => l.levelId === ADVANCED_TRACK.levels![1].id)!;
  await withRoot(<SaraLessonMap lessons={ADVANCED_TRACK.lessons} levels={ADVANCED_TRACK.levels} unlocked={lv2.order} lang="ar" trackTitleAr="x" onOpen={() => {}} />, async () => {
    assert.ok(q('[data-testid="sara-map-zone-new"]'));
    assert.equal(q('[data-testid="sara-map-zone"]')!.dataset.zone, 'sea');
  });
});

test('room: locked items cannot be picked, unlocked ones save to this device only', async () => {
  await withRoot(<StudentRoom uid="kid1" xp={320} name="عبود" onClose={() => {}} />, async () => {
    assert.match(q('[data-testid="gamify-room-xp"]')!.textContent || '', /320/);
    assert.match(q('[data-testid="gamify-room-next"]')!.textContent || '', /باقي 80/); // 400 game pad
    const hero = q('[data-testid="gamify-item-ch-hero"]')!;
    assert.equal(hero.disabled, true);
    await act(async () => { hero.click(); });
    assert.equal(localStorage.getItem(roomKey('kid1')), null, 'locked click saves nothing');
    await act(async () => { q('[data-testid="gamify-item-ch-cat"]')!.click(); });
    await act(async () => { q('[data-testid="gamify-room-tab-hat"]')!.click(); });
    await act(async () => { q('[data-testid="gamify-item-hat-grad"]')!.click(); });
    const saved = JSON.parse(localStorage.getItem(roomKey('kid1'))!);
    assert.equal(saved.character, 'ch-cat'); assert.equal(saved.hat, 'hat-grad');
    assert.deepEqual(Object.keys({ ...localStorage }), [roomKey('kid1')], 'only the room key is written');
    assert.deepEqual(readAvatar('kid1'), { character: '🐱', hat: '🎓', pet: '' });
    assert.match(q('[data-testid="gamify-room-xp"]')!.textContent || '', /320/, 'XP unchanged');
  });
});

test('streak sheet: flame, week dots, badges and Sara line', async () => {
  const today = (await import('../src/services/streakService')).getRiyadhDateStr();
  await withRoot(<StreakSheet streak={{ current: 40, longest: 40, lastActiveDate: today, freezesLeft: 1 }} today={today} onClose={() => {}} />, async () => {
    assert.equal(q('[data-testid="gamify-flame"]')!.dataset.level, '5');
    const dow = new Date(`${today}T00:00:00Z`).getUTCDay();
    assert.equal(qa('[data-studied="1"]').length, dow + 1, 'every day of this week up to today');
    assert.match(q('[data-testid="gamify-sara-line"]')!.textContent || '', /شهر كامل/);
  });
  await withRoot(<StreakSheet streak={null} today={TODAY} onClose={() => {}} />, async () => {
    assert.equal(q('[data-testid="gamify-flame"]')!.dataset.level, '0');
    assert.equal(qa('[data-earned="1"]').length, 0);
  });
});

test('parent card line uses only real numbers', () => {
  assert.match(parentLine('عبود', 0, 0), /أسبوع جديد/);
  assert.match(parentLine('عبود', 6, 2), /نجم الأسبوع/);
  assert.match(parentLine('', 2, 2), /بطلنا/);
});
