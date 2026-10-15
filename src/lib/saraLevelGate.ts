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
