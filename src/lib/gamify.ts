/**
 * 🎮 Map gamification helpers (pure, display only).
 * - Zones: each level of a lesson map is drawn as a place (forest, sea, mountain…).
 * - Streak: flame size, this week's study days and badges are DERIVED from the existing
 *   streak record ({ current, lastActiveDate }) — nothing here writes streak, progress or XP.
 * - Room: items unlock when the student's existing XP (users/{uid}.points) reaches a threshold.
 *   XP is only read; unlocking never spends or deducts anything.
 */

// ───────────────────────── Zones (الخريطة الحيّة) ─────────────────────────
export type ZoneKind = 'forest' | 'sea' | 'mountain' | 'city' | 'desert' | 'island' | 'castle' | 'space';
export interface MapZone {
  kind: ZoneKind; nameAr: string; nameEn: string; emoji: string;
  /** Soft sky → ground gradient behind the path (kept light so lesson circles stay readable). */
  sky: string; ground: string; hill: string; hill2: string;
  /** Small original decorations drawn along the path edges. */
  decor: string[];
}
export const MAP_ZONES: MapZone[] = [
  { kind: 'forest', nameAr: 'غابة الكلمات', nameEn: 'Word Forest', emoji: '🌳', sky: '#eafbe7', ground: '#d4f3cc', hill: '#9fdc8c', hill2: '#6cc35a', decor: ['🌲', '🍄', '🌳', '🦋', '🌼', '🐿️'] },
  { kind: 'sea', nameAr: 'بحر الحروف', nameEn: 'Letter Sea', emoji: '🌊', sky: '#e6f6ff', ground: '#cdeeff', hill: '#8fd3f5', hill2: '#4fb3e6', decor: ['🐠', '🐚', '🌊', '🐬', '⛵', '🦀'] },
  { kind: 'mountain', nameAr: 'جبل التحدّي', nameEn: 'Challenge Mountain', emoji: '⛰️', sky: '#f1f0ff', ground: '#e3e1f7', hill: '#b9b4e6', hill2: '#8c86cf', decor: ['🏔️', '🦅', '⛺', '🌲', '❄️', '🪨'] },
  { kind: 'city', nameAr: 'مدينة الأحلام', nameEn: 'Dream City', emoji: '🏙️', sky: '#fff4e6', ground: '#ffe7c7', hill: '#f7c58b', hill2: '#e9a45a', decor: ['🏢', '🚕', '🚦', '🎡', '🏬', '🚌'] },
  { kind: 'desert', nameAr: 'صحراء النجوم', nameEn: 'Star Desert', emoji: '🏜️', sky: '#fff8e1', ground: '#fbe9b7', hill: '#f2d07a', hill2: '#ddb04c', decor: ['🐪', '🌴', '⭐', '🏕️', '🦎', '🌵'] },
  { kind: 'island', nameAr: 'جزيرة الكنز', nameEn: 'Treasure Island', emoji: '🏝️', sky: '#e8fbf6', ground: '#c9f2e6', hill: '#88dcc4', hill2: '#45bf9c', decor: ['🏝️', '🦜', '💎', '🗺️', '🐢', '🥥'] },
  { kind: 'castle', nameAr: 'قلعة الأبطال', nameEn: 'Heroes Castle', emoji: '🏰', sky: '#fdeef6', ground: '#f8dcec', hill: '#eeaed0', hill2: '#d97fb0', decor: ['🏰', '🛡️', '🐉', '🚩', '🗝️', '⚔️'] },
  { kind: 'space', nameAr: 'محطة الفضاء', nameEn: 'Space Station', emoji: '🚀', sky: '#e9ecff', ground: '#d7dcff', hill: '#a7b0f2', hill2: '#7581dd', decor: ['🪐', '🌙', '⭐', '🛰️', '☄️', '👽'] },
];
/** Zone of the n-th level of a map (cycles after 8 levels; the colour offset keeps tracks varied). */
export const zoneFor = (levelIndex: number, offset = 0): MapZone => {
  const n = MAP_ZONES.length;
  return MAP_ZONES[(((levelIndex + offset) % n) + n) % n];
};

// ───────────────────────── Streak (سلسلة الأيام) ─────────────────────────
export interface StreakLike { current: number; lastActiveDate: string; freezesLeft?: number }

/** Whole-day difference between two YYYY-MM-DD dates (a − b). */
export function dayDiff(a: string, b: string): number {
  if (!a || !b) return 9999;
  const [y1, m1, d1] = a.split('-').map(Number); const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y1, m1 - 1, d1) - Date.UTC(y2, m2 - 1, d2)) / 86400000);
}
export function addDays(date: string, n: number): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d) + n * 86400000).toISOString().slice(0, 10);
}

/** Streak still alive today? Same rule as the existing service: yesterday counts, one missed day is covered by a freeze. */
export function liveStreak(s: StreakLike | null | undefined, today: string): number {
  if (!s || !s.current || !s.lastActiveDate) return 0;
  const gap = dayDiff(today, s.lastActiveDate);
  if (gap < 0) return s.current;
  if (gap <= 1) return s.current;
  if (gap === 2 && (s.freezesLeft ?? 0) > 0) return s.current;
  return 0;
}

export interface FlameStage { level: number; scale: number; labelAr: string; labelEn: string }
const FLAMES: [number, FlameStage][] = [
  [30, { level: 5, scale: 1.9, labelAr: 'شعلة أسطورية', labelEn: 'Legendary flame' }],
  [14, { level: 4, scale: 1.65, labelAr: 'شعلة عملاقة', labelEn: 'Giant flame' }],
  [7, { level: 3, scale: 1.4, labelAr: 'شعلة قوية', labelEn: 'Strong flame' }],
  [3, { level: 2, scale: 1.2, labelAr: 'شعلة تكبر', labelEn: 'Growing flame' }],
  [1, { level: 1, scale: 1, labelAr: 'شرارة', labelEn: 'Spark' }],
];
/** Flame grows with the streak: 1 spark · 3 growing · 7 strong · 14 giant · 30 legendary. */
export function flameStage(streak: number): FlameStage {
  for (const [min, st] of FLAMES) if (streak >= min) return st;
  return { level: 0, scale: 0.8, labelAr: 'الشعلة نايمة', labelEn: 'Flame asleep' };
}

export interface WeekDay { date: string; studied: boolean; isToday: boolean; future: boolean; dayAr: string }
const DAYS_AR = ['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
/** The current week (Sunday → Saturday) with the days covered by the streak record marked as studied. */
export function weekStudyDays(s: StreakLike | null | undefined, today: string): WeekDay[] {
  const [y, m, d] = today.split('-').map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const start = addDays(today, -dow);
  const out: WeekDay[] = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    let studied = false;
    if (s && s.current > 0 && s.lastActiveDate) {
      const back = dayDiff(s.lastActiveDate, date);
      studied = back >= 0 && back < s.current;
    }
    out.push({ date, studied, isToday: date === today, future: dayDiff(date, today) > 0, dayAr: DAYS_AR[i] });
  }
  return out;
}

export interface WeekBadge { tier: 'bronze' | 'silver' | 'gold'; min: number; emoji: string; nameAr: string; nameEn: string }
export const WEEK_BADGES: WeekBadge[] = [
  { tier: 'bronze', min: 3, emoji: '🥉', nameAr: 'وسام الأسبوع البرونزي', nameEn: 'Bronze week' },
  { tier: 'silver', min: 5, emoji: '🥈', nameAr: 'وسام الأسبوع الفضي', nameEn: 'Silver week' },
  { tier: 'gold', min: 7, emoji: '🥇', nameAr: 'وسام الأسبوع الذهبي', nameEn: 'Gold week' },
];
/** Badge earned this week (3 / 5 / 7 study days) and the next one to aim for. */
export function weeklyBadge(studiedDays: number): { earned: WeekBadge | null; next: WeekBadge | null; daysToNext: number } {
  const earned = [...WEEK_BADGES].reverse().find(b => studiedDays >= b.min) ?? null;
  const next = WEEK_BADGES.find(b => studiedDays < b.min) ?? null;
  return { earned, next, daysToNext: next ? next.min - studiedDays : 0 };
}

/** Sara's short encouragement for the streak (Arabic, kid-friendly). */
export function saraStreakLine(streak: number, studiedToday: boolean, lang: 'ar' | 'en' = 'ar'): string {
  const ar = lang !== 'en';
  if (streak <= 0) return ar ? 'يلا نولّع الشعلة اليوم! درس واحد بس ويبدأ مشوارك 🔥' : "Let's light the flame today! Just one lesson 🔥";
  if (!studiedToday) return ar ? `عندك ${streak} ${streak === 1 ? 'يوم' : 'أيام'} ورا بعض! خلّص درس اليوم عشان ما تطفى الشعلة 💪` : `${streak} days in a row! Finish today's lesson so the flame stays on 💪`;
  if (streak >= 30) return ar ? 'شهر كامل! أنت بطل حقيقي، أنا فخورة فيك مرّة 👑' : "A whole month! You're a real hero 👑";
  if (streak >= 14) return ar ? 'أسبوعين ورا بعض! شعلتك صارت عملاقة 🚀' : 'Two weeks in a row! Giant flame 🚀';
  if (streak >= 7) return ar ? 'أسبوع كامل! كسبت الشعلة القوية، كمّل يا بطل 🌟' : 'A full week! Keep going, champ 🌟';
  if (streak >= 3) return ar ? `${streak} أيام ورا بعض! شعلتك تكبر، أنا مبسوطة فيك 😍` : `${streak} days! Your flame is growing 😍`;
  return ar ? 'أحسنت! ولّعت شعلة اليوم، أشوفك بكرة 😊' : 'Well done! See you tomorrow 😊';
}

// ───────────────────────── Room (غرفتي) ─────────────────────────
export type RoomSlot = 'character' | 'hat' | 'pet' | 'wall' | 'decor';
export interface RoomItem { id: string; slot: RoomSlot; emoji: string; nameAr: string; nameEn: string; xp: number }
/** XP thresholds are read-only milestones: reaching them unlocks an item forever (nothing is spent). */
export const ROOM_ITEMS: RoomItem[] = [
  // Character
  { id: 'ch-boy', slot: 'character', emoji: '👦', nameAr: 'ولد', nameEn: 'Boy', xp: 0 },
  { id: 'ch-girl', slot: 'character', emoji: '👧', nameAr: 'بنت', nameEn: 'Girl', xp: 0 },
  { id: 'ch-cat', slot: 'character', emoji: '🐱', nameAr: 'زي القطّو', nameEn: 'Cat suit', xp: 150 },
  { id: 'ch-hero', slot: 'character', emoji: '🦸', nameAr: 'بطل خارق', nameEn: 'Superhero', xp: 600 },
  { id: 'ch-astro', slot: 'character', emoji: '🧑‍🚀', nameAr: 'رائد فضاء', nameEn: 'Astronaut', xp: 1500 },
  { id: 'ch-ninja', slot: 'character', emoji: '🥷', nameAr: 'نينجا', nameEn: 'Ninja', xp: 3000 },
  // Hat
  { id: 'hat-none', slot: 'hat', emoji: '', nameAr: 'بدون', nameEn: 'None', xp: 0 },
  { id: 'hat-cap', slot: 'hat', emoji: '🧢', nameAr: 'كاب', nameEn: 'Cap', xp: 50 },
  { id: 'hat-grad', slot: 'hat', emoji: '🎓', nameAr: 'قبعة التخرّج', nameEn: 'Grad cap', xp: 300 },
  { id: 'hat-crown', slot: 'hat', emoji: '👑', nameAr: 'تاج', nameEn: 'Crown', xp: 1000 },
  { id: 'hat-top', slot: 'hat', emoji: '🎩', nameAr: 'قبعة ساحر', nameEn: 'Magic hat', xp: 2000 },
  // Pet
  { id: 'pet-none', slot: 'pet', emoji: '', nameAr: 'بدون', nameEn: 'None', xp: 0 },
  { id: 'pet-chick', slot: 'pet', emoji: '🐥', nameAr: 'صوصو', nameEn: 'Chick', xp: 100 },
  { id: 'pet-dog', slot: 'pet', emoji: '🐶', nameAr: 'جرو', nameEn: 'Puppy', xp: 500 },
  { id: 'pet-unicorn', slot: 'pet', emoji: '🦄', nameAr: 'يونيكورن', nameEn: 'Unicorn', xp: 1200 },
  { id: 'pet-dragon', slot: 'pet', emoji: '🐉', nameAr: 'تنّين', nameEn: 'Dragon', xp: 2500 },
  // Wall
  { id: 'wall-sky', slot: 'wall', emoji: '🌤️', nameAr: 'سما', nameEn: 'Sky', xp: 0 },
  { id: 'wall-sunset', slot: 'wall', emoji: '🌅', nameAr: 'غروب', nameEn: 'Sunset', xp: 250 },
  { id: 'wall-forest', slot: 'wall', emoji: '🌲', nameAr: 'غابة', nameEn: 'Forest', xp: 700 },
  { id: 'wall-space', slot: 'wall', emoji: '🌌', nameAr: 'فضاء', nameEn: 'Space', xp: 1800 },
  // Decor (several at once)
  { id: 'dc-plant', slot: 'decor', emoji: '🪴', nameAr: 'نبتة', nameEn: 'Plant', xp: 0 },
  { id: 'dc-books', slot: 'decor', emoji: '📚', nameAr: 'كتب', nameEn: 'Books', xp: 80 },
  { id: 'dc-teddy', slot: 'decor', emoji: '🧸', nameAr: 'دبدوب', nameEn: 'Teddy', xp: 150 },
  { id: 'dc-game', slot: 'decor', emoji: '🎮', nameAr: 'بلايستيشن', nameEn: 'Game pad', xp: 400 },
  { id: 'dc-globe', slot: 'decor', emoji: '🌍', nameAr: 'كرة أرضية', nameEn: 'Globe', xp: 650 },
  { id: 'dc-scope', slot: 'decor', emoji: '🔭', nameAr: 'تلسكوب', nameEn: 'Telescope', xp: 900 },
  { id: 'dc-trophy', slot: 'decor', emoji: '🏆', nameAr: 'كأس', nameEn: 'Trophy', xp: 2000 },
  { id: 'dc-rocket', slot: 'decor', emoji: '🚀', nameAr: 'صاروخ', nameEn: 'Rocket', xp: 4000 },
];
export const WALLS: Record<string, string> = {
  'wall-sky': 'linear-gradient(180deg,#bfe6ff,#e9f7ff)',
  'wall-sunset': 'linear-gradient(180deg,#ffb88c,#ffe3c2)',
  'wall-forest': 'linear-gradient(180deg,#a8e6a1,#e3f8de)',
  'wall-space': 'linear-gradient(180deg,#1b1f4b,#3b3f8f)',
};
export const MAX_DECOR = 4;

/** Unlocked when the student's XP is at or above the item's threshold (XP itself never changes). */
export const itemUnlocked = (xp: number, item: RoomItem) => (Number.isFinite(xp) ? xp : 0) >= item.xp;
/** Next locked item and how much XP is still missing (null when everything is open). */
export function nextUnlock(xp: number): { item: RoomItem; missing: number } | null {
  const locked = ROOM_ITEMS.filter(i => !itemUnlocked(xp, i)).sort((a, b) => a.xp - b.xp);
  return locked.length ? { item: locked[0], missing: locked[0].xp - Math.max(0, xp || 0) } : null;
}

export interface RoomState { character: string; hat: string; pet: string; wall: string; decor: string[] }
export const DEFAULT_ROOM: RoomState = { character: 'ch-boy', hat: 'hat-none', pet: 'pet-none', wall: 'wall-sky', decor: ['dc-plant'] };
const byId = new Map(ROOM_ITEMS.map(i => [i.id, i]));
export const roomItem = (id: string) => byId.get(id);

/** Keeps only known, unlocked choices (a saved item that is somehow locked falls back to the default). */
export function sanitizeRoom(raw: unknown, xp: number): RoomState {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<RoomState>;
  const pick = (slot: Exclude<RoomSlot, 'decor'>) => {
    const it = typeof r[slot] === 'string' ? byId.get(r[slot] as string) : undefined;
    return it && it.slot === slot && itemUnlocked(xp, it) ? it.id : DEFAULT_ROOM[slot];
  };
  const decor = Array.isArray(r.decor)
    ? Array.from(new Set(r.decor.filter(id => { const it = byId.get(id); return !!it && it.slot === 'decor' && itemUnlocked(xp, it); }))).slice(0, MAX_DECOR)
    : DEFAULT_ROOM.decor;
  return { character: pick('character'), hat: pick('hat'), pet: pick('pet'), wall: pick('wall'), decor };
}

/** Room choices live on this device only (localStorage) — no Firestore write, no rules change. */
export const roomKey = (uid?: string | null) => `academy_room_v1_${uid || 'guest'}`;
export function loadRoom(uid: string | null | undefined, xp: number): RoomState {
  try { const s = localStorage.getItem(roomKey(uid)); return sanitizeRoom(s ? JSON.parse(s) : null, xp); } catch { return { ...DEFAULT_ROOM }; }
}
export function saveRoom(uid: string | null | undefined, room: RoomState) {
  try { localStorage.setItem(roomKey(uid), JSON.stringify(room)); } catch { /* private mode */ }
}
/** Avatar shown on the map: the room's character + hat + pet (defaults when nothing is saved). */
export function readAvatar(uid?: string | null): { character: string; hat: string; pet: string } {
  let room: Partial<RoomState> = DEFAULT_ROOM;
  try { const s = localStorage.getItem(roomKey(uid)); if (s) room = JSON.parse(s); } catch { /* ignore */ }
  const e = (id: unknown, slot: RoomSlot, fb: string) => { const it = typeof id === 'string' ? byId.get(id) : undefined; return it && it.slot === slot ? it.emoji : fb; };
  return { character: e(room.character, 'character', '👦'), hat: e(room.hat, 'hat', ''), pet: e(room.pet, 'pet', '') };
}

// ───────────────────────── Weekly card (بطاقة إنجاز للأهل) ─────────────────────────
/** Sunday → Saturday range of the week that contains `today`, formatted in Arabic (e.g. "١٥ – ٢١ نوفمبر"). */
export function weekRangeLabel(today: string, lang: 'ar' | 'en' = 'ar'): string {
  const days = weekStudyDays(null, today);
  const fmt = (d: string, withMonth: boolean) => {
    const [y, m, dd] = d.split('-').map(Number);
    try {
      return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'ar-SA-u-ca-gregory-nu-arab', withMonth ? { day: 'numeric', month: 'long', timeZone: 'UTC' } : { day: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, dd)));
    } catch { return withMonth ? `${dd}/${m}` : String(dd); }
  };
  const a = days[0].date, b = days[6].date;
  const sameMonth = a.slice(5, 7) === b.slice(5, 7);
  return `${fmt(a, !sameMonth)} – ${fmt(b, true)}`;
}
