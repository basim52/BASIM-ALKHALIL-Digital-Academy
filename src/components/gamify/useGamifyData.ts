import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { getStudentStreak, getRiyadhDateStr, type StreakData } from '../../services/streakService';

export interface GamifyData { uid: string | null; streak: StreakData | null; xp: number | null; name: string; today: string }

/** Student's existing streak, XP (users/{uid}.points) and name — READ ONLY. Nothing here writes Firestore or localStorage. */
export function useGamifyData(uidProp?: string | null): GamifyData {
  const uid = uidProp || auth.currentUser?.uid || null;
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [xp, setXp] = useState<number | null>(null);
  const [name, setName] = useState<string>(auth.currentUser?.displayName || '');
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    getStudentStreak(uid).then(s => { if (alive) setStreak(s); }).catch(() => {});
    if (auth.currentUser && !uid.startsWith('sim_')) {
      getDoc(doc(db, 'users', uid)).then(snap => {
        if (!alive || !snap.exists()) return;
        const d: any = snap.data();
        const p = Number(d.points);
        setXp(Number.isFinite(p) && p > 0 ? p : 0);
        if (d.displayName) setName(String(d.displayName));
      }).catch(() => {});
    }
    return () => { alive = false; };
  }, [uid]);
  return { uid, streak, xp, name, today: getRiyadhDateStr() };
}
