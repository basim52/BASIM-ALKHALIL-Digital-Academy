import { useEffect, useState } from 'react';
import { loadLevelTestAttempts, type LevelTestAttempt } from './saraLevelTests';

export const SARA_NEW_LEVELS = [
  { id: 'a' as const, titleAr: 'المستوى الأول', from: 1, to: 30 },
  { id: 'b' as const, titleAr: 'المستوى الثاني', from: 31, to: 60 },
  { id: 'c' as const, titleAr: 'المستوى الثالث', from: 61, to: 90 },
  { id: 'd' as const, titleAr: 'المستوى الرابع', from: 91, to: 120 },
];
const localAttempts = (uid?: string): LevelTestAttempt[] => { try { return JSON.parse(localStorage.getItem(`sara_level_tests_${uid || 'guest'}`) || '[]'); } catch { return []; } };
/** Has the student passed this level's end test (device ∪ cloud)? Level 2 opens only after level 1 is passed. */
export function useLevelPassed(uid: string | undefined, trackId: string, levelId: string, refresh = 0): boolean {
  const has = (l: LevelTestAttempt[]) => l.some(a => a.trackId === trackId && a.levelId === levelId && a.passed);
  const [ok, setOk] = useState(() => has(localAttempts(uid)));
  useEffect(() => {
    setOk(has(localAttempts(uid)));
    if (!uid) return;
    let alive = true;
    loadLevelTestAttempts(uid).then(l => { if (alive && has(l)) setOk(true); });
    return () => { alive = false; };
  }, [uid, trackId, levelId, refresh]); // eslint-disable-line react-hooks/exhaustive-deps
  return ok;
}

/** Max end-of-level test attempts per student, per track+level, in a rolling 30-day window. */
export const LEVEL_TEST_MAX_ATTEMPTS = 3;
export const LEVEL_TEST_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
export interface LevelTestQuota { used: number; remaining: number; nextOpenAt: number | null; total: number; last: LevelTestAttempt | null; loading: boolean }
/** Pure: attempts for one track+level (cloud ∪ device, de-duplicated by time). */
export function levelTestQuota(list: LevelTestAttempt[], trackId: string, levelId: string, now = Date.now()): Omit<LevelTestQuota, 'loading'> {
  const seen = new Set<number>();
  const mine = list.filter(a => a && a.trackId === trackId && a.levelId === levelId && !seen.has(a.createdAtMs) && seen.add(a.createdAtMs)).sort((x, y) => x.createdAtMs - y.createdAtMs);
  const recent = mine.filter(a => now - a.createdAtMs < LEVEL_TEST_WINDOW_MS);
  const remaining = Math.max(0, LEVEL_TEST_MAX_ATTEMPTS - recent.length);
  // When full: the next slot opens when the oldest attempt in the window turns 30 days old.
  const nextOpenAt = remaining > 0 ? null : recent[recent.length - LEVEL_TEST_MAX_ATTEMPTS].createdAtMs + LEVEL_TEST_WINDOW_MS;
  return { used: recent.length, remaining, nextOpenAt, total: mine.length, last: mine[mine.length - 1] || null };
}
export function useLevelTestQuota(uid: string | undefined, trackId: string, levelId: string, refresh = 0): LevelTestQuota {
  const [q, setQ] = useState<LevelTestQuota>(() => ({ ...levelTestQuota(localAttempts(uid), trackId, levelId), loading: !!uid }));
  useEffect(() => {
    const local = localAttempts(uid);
    setQ({ ...levelTestQuota(local, trackId, levelId), loading: !!uid });
    if (!uid) return;
    let alive = true;
    loadLevelTestAttempts(uid).then(l => { if (alive) setQ({ ...levelTestQuota([...l, ...local], trackId, levelId), loading: false }); }).catch(() => { if (alive) setQ(p => ({ ...p, loading: false })); });
    return () => { alive = false; };
  }, [uid, trackId, levelId, refresh]); // eslint-disable-line react-hooks/exhaustive-deps
  return q;
}
const AR_DIGITS = '٠١٢٣٤٥٦٧٨٩';
const arNum = (n: number) => String(n).replace(/\d/g, d => AR_DIGITS[+d]);
export function quotaLabel(q: LevelTestQuota): string {
  if (q.remaining === 1) return 'باقي لك محاولة وحدة هالشهر';
  if (q.remaining > 0) return `باقي لك ${arNum(q.remaining)} محاولات هالشهر`;
  const d = new Date(q.nextOpenAt!).toLocaleDateString('ar-SA-u-ca-gregory', { day: 'numeric', month: 'long' });
  return `خلصت محاولاتك الثلاث — المحاولة الجاية تفتح ${d}`;
}
