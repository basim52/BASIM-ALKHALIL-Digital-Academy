import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { computeSaraSkills, NEW_SKILL_TRACKS } from './saraSkills';
import { loadTrackProgress } from './saraProgressSync';
import { loadLevelTestAttempts, summarizeLevelTests } from './saraLevelTests';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';

const ALL_TRACKS = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...NEW_SKILL_TRACKS];

export interface CallContext { text: string; focusAr: string[]; focusEn: string[] }

/** What Sara should practise on the call, built only from the student's real data (track progress, level tests, IELTS/STEP, tutor memory). */
export async function buildCallContext(uid: string | undefined, opts: { placement?: string | null; lessonTitle?: string; mistakes?: string[] } = {}): Promise<CallContext> {
  const focusAr: string[] = [], focusEn: string[] = [], parts: string[] = [];
  if (opts.lessonTitle) { parts.push(`Current lesson: "${opts.lessonTitle}".`); focusAr.push(`الدرس الحالي: ${opts.lessonTitle}`); focusEn.push(`Current lesson: ${opts.lessonTitle}`); }
  try {
    const [skills, remote, attempts] = await Promise.all([
      computeSaraSkills(uid, opts.placement),
      uid ? loadTrackProgress(uid) : Promise.resolve({} as Record<string, number>),
      uid ? loadLevelTestAttempts(uid) : Promise.resolve([]),
    ]);
    // Current track = the started track with the most recent progress; next lesson = its first unpassed lesson.
    const local = (id: string) => { try { return Number(localStorage.getItem(`sara_track_${id}_${uid || 'guest'}`)) || 1; } catch { return 1; } };
    const started = ALL_TRACKS.map(t => ({ t, u: Math.max(Number((remote as any)[t.id]) || 1, local(t.id)) })).filter(x => x.u > 1 && x.u <= x.t.lessons.length).sort((a, b) => b.u - a.u);
    if (!opts.lessonTitle && started[0]) {
      const l = started[0].t.lessons[started[0].u - 1];
      parts.push(`Current track: ${started[0].t.titleEn}, next lesson "${l.titleEn}".`);
      focusAr.push(`${started[0].t.titleAr}: ${l.titleAr}`); focusEn.push(`${started[0].t.titleEn}: ${l.titleEn}`);
    }
    // Weak lessons from the latest failed / imperfect level tests.
    const weak = summarizeLevelTests(attempts).filter(s => s.trackId !== 'placement').flatMap(s => s.latest.weakLessons).sort((a, b) => b.wrong - a.wrong).slice(0, 3);
    const titleEn = (id: string) => ALL_TRACKS.flatMap(t => t.lessons).find(l => l.id === id)?.titleEn;
    if (weak.length) {
      parts.push(`Weak points from level tests: ${weak.map(w => titleEn(w.id) || w.titleAr).join('; ')}.`);
      weak.forEach(w => { focusAr.push(w.titleAr); focusEn.push(titleEn(w.id) || w.titleAr); });
    }
    // Weakest skill (lowest level-test best, else lowest progress among started skills).
    const tested = skills.skills.filter(s => s.testBest !== null).sort((a, b) => (a.testBest as number) - (b.testBest as number));
    const low = tested[0] && (tested[0].testBest as number) < 80 ? tested[0] : skills.skills.filter(s => s.passed > 0).sort((a, b) => a.pct - b.pct)[0];
    if (low) { parts.push(`Weakest skill: ${low.labelEn.replace(/[^\w\s]/g, '').trim()}${low.testBest !== null ? ` (best test ${low.testBest}%)` : ''}.`); focusAr.push(low.labelAr); focusEn.push(low.labelEn); }
    const ex = skills.exam.filter(e => e.total).sort((a, b) => a.bestCorrect / a.total - b.bestCorrect / b.total)[0];
    if (ex) parts.push(`Practising ${ex.exam} ${ex.kind}.`);
    if (skills.placementLevel) parts.push(`Level ${skills.placementLevel}.`);
  } catch { /* offline: use what we have */ }
  const m = (opts.mistakes || []).filter(Boolean).slice(-3);
  if (m.length) { parts.push(`Recent mistakes: ${m.join('; ')}.`); }
  return { text: parts.join(' ').slice(0, 700), focusAr: focusAr.slice(0, 4), focusEn: focusEn.slice(0, 4) };
}

export interface CallReviewSummary { verdict: string; verdictAr: string; summaryAr: string; points: { area: string; said: string; better: string }[] }
export interface CallRecord { at: number; scenario: string; scenarioAr: string; seconds: number; turns: number; words: number; avgReplyMs: number; focus: string[]; review?: CallReviewSummary; topicId?: string; topicAr?: string; topicEn?: string; dateKey?: string; weekKey?: string }
const KEY = (uid?: string) => `sara_calls_${uid || 'guest'}`;

export function readCallRecords(uid?: string): CallRecord[] { try { return JSON.parse(localStorage.getItem(KEY(uid)) || '[]'); } catch { return []; } }

/** Save one finished call (real numbers) to the device and users/{uid}.saraCalls (last 20). */
export async function saveCallRecord(uid: string | undefined, rec: CallRecord): Promise<boolean> {
  const list = [...readCallRecords(uid).filter(c => c.at !== rec.at), rec].slice(-20); // same call → updated in place
  try { localStorage.setItem(KEY(uid), JSON.stringify(list)); } catch { /* ignore */ }
  if (!uid) return false;
  try {
    const cloud = ((await getDoc(doc(db, 'users', uid))).data()?.saraCalls as CallRecord[]) || [];
    const merged = [...cloud.filter(c => c.at !== rec.at), rec].sort((a, b) => a.at - b.at).slice(-20);
    await updateDoc(doc(db, 'users', uid), { saraCalls: merged });
    return true;
  } catch (e) { console.debug('saraCalls save note:', e); return false; }
}

export async function loadCallRecords(uid: string): Promise<CallRecord[]> {
  try { return ((await getDoc(doc(db, 'users', uid))).data()?.saraCalls as CallRecord[]) || []; } catch { return []; }
}
