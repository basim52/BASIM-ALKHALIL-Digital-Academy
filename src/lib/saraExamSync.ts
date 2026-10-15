import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/** IELTS/STEP practice results: device + cloud users/{uid}.saraExamPrep = { [setId]: ExamResult }. Real raw counts only (no band predictions). */
export interface ExamResult { correct: number; total: number; timeSec: number; at: number; attempts: number; lastCorrect: number; lastTimeSec: number; lastAt: number }
export type ExamResults = Record<string, ExamResult>;
const KEY = (uid?: string) => `sara_exam_prep_${uid || 'guest'}`;

export function readExamResults(uid?: string): ExamResults {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY(uid)) || '{}') as Record<string, Partial<ExamResult>>;
    const out: ExamResults = {};
    for (const [k, v] of Object.entries(raw)) out[k] = { correct: v.correct || 0, total: v.total || 0, timeSec: v.timeSec || 0, at: v.at || 0, attempts: v.attempts || 1, lastCorrect: v.lastCorrect ?? v.correct ?? 0, lastTimeSec: v.lastTimeSec ?? v.timeSec ?? 0, lastAt: v.lastAt ?? v.at ?? 0 };
    return out;
  } catch { return {}; }
}
const writeLocal = (uid: string | undefined, r: ExamResults) => { try { localStorage.setItem(KEY(uid), JSON.stringify(r)); } catch { /* ignore */ } };

/** Record one finished attempt; returns true when the cloud copy saved. */
export async function saveExamAttempt(uid: string | undefined, setId: string, correct: number, total: number, timeSec: number): Promise<boolean> {
  const all = readExamResults(uid); const p = all[setId]; const now = Date.now();
  const better = !p || correct > p.correct || (correct === p.correct && timeSec < p.timeSec);
  const r: ExamResult = { correct: better ? correct : p!.correct, total, timeSec: better ? timeSec : p!.timeSec, at: better ? now : p!.at,
    attempts: (p?.attempts || 0) + 1, lastCorrect: correct, lastTimeSec: timeSec, lastAt: now };
  all[setId] = r; writeLocal(uid, all);
  if (!uid) return false;
  try { await updateDoc(doc(db, 'users', uid), { [`saraExamPrep.${setId}`]: r }); return true; } catch (e) { console.debug('saraExamPrep save note:', e); return false; }
}

export async function loadExamResults(uid: string): Promise<ExamResults> {
  try { return ((await getDoc(doc(db, 'users', uid))).data()?.saraExamPrep as ExamResults) || {}; } catch { return {}; }
}

/** Merge cloud ↔ device; newest attempt wins for "last", best wins for best, attempts = max. Returns true if local changed. */
export async function syncExamResults(uid: string | undefined): Promise<boolean> {
  if (!uid) return false;
  const remote = await loadExamResults(uid); const local = readExamResults(uid);
  let changed = false; const up: Record<string, ExamResult> = {};
  for (const id of new Set([...Object.keys(remote), ...Object.keys(local)])) {
    const a = local[id], b = remote[id];
    if (!a) { local[id] = b; changed = true; continue; }
    if (!b) { up[`saraExamPrep.${id}`] = a; continue; }
    const best = a.correct > b.correct || (a.correct === b.correct && a.timeSec <= b.timeSec) ? a : b;
    const last = a.lastAt >= b.lastAt ? a : b;
    const m: ExamResult = { correct: best.correct, total: a.total || b.total, timeSec: best.timeSec, at: best.at, attempts: Math.max(a.attempts, b.attempts), lastCorrect: last.lastCorrect, lastTimeSec: last.lastTimeSec, lastAt: last.lastAt };
    if (JSON.stringify(m) !== JSON.stringify(a)) { local[id] = m; changed = true; }
    if (JSON.stringify(m) !== JSON.stringify(b)) up[`saraExamPrep.${id}`] = m;
  }
  if (changed) writeLocal(uid, local);
  if (Object.keys(up).length) { try { await updateDoc(doc(db, 'users', uid), up); } catch (e) { console.debug('saraExamPrep sync note:', e); } }
  return changed;
}
