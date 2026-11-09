import { LAST_LESSON_ID } from './curriculum.js';
import { saysPhrase, type Message, type Misconception, type Praise, type Reply } from './protocol.js';

/**
 * Abboud's own encouragement, kept apart from the academy: stars, the «معلّم صغير» certificate and
 * the parent's session summaries live only in this device's localStorage under activity + student keys.
 * Nothing here touches Sara's progress, XP, official certificates, Firestore or its rules.
 */
export type StarKind = 'explain' | 'correction';
export type LessonStars = Partial<Record<StarKind, true>>;
export type Awards = { stars: Record<string, LessonStars>; name: string };
export type SessionReport = {
  at: string; lesson: string; explained: string; englishWords: string[];
  englishTurns: number; abboudTurns: number; stars: number; strength?: string; tip?: string;
};
type Store = Pick<Storage, 'getItem' | 'setItem'>;
export const awardsKey = (uid: string) => `abboud-teacher-awards:v1:${uid}`;
export const reportsKey = (uid: string) => `abboud-teacher-reports:v1:${uid}`;
export const DEFAULT_NAME = 'عبود';
export const REPORTS_KEPT = 10;
const MAX_LESSON_KEYS = LAST_LESSON_ID + 20;
const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
function read(storage: Store, key: string): unknown { try { return JSON.parse(storage.getItem(key) || 'null'); } catch { return null; } }
function write(storage: Store, uid: string | undefined, key: string, value: unknown) {
  if (uid) try { storage.setItem(key, JSON.stringify(value)); } catch { /* Activity works without persistence. */ }
}
export const lessonKey = (lessonId: number, customTopic = '') => customTopic ? `custom:${customTopic}` : `L${lessonId}`;

export function readAwards(storage: Store, uid?: string): Awards {
  const empty: Awards = { stars: {}, name: DEFAULT_NAME };
  const data = uid ? read(storage, awardsKey(uid)) : null;
  if (!isRecord(data)) return empty;
  const stars: Record<string, LessonStars> = {};
  if (isRecord(data.stars)) for (const [key, value] of Object.entries(data.stars).slice(0, MAX_LESSON_KEYS)) {
    if (!isRecord(value)) continue;
    const kept: LessonStars = {};
    if (value.explain === true) kept.explain = true;
    if (value.correction === true) kept.correction = true;
    if (kept.explain || kept.correction) stars[key] = kept;
  }
  return { stars, name: cleanName(data.name) || DEFAULT_NAME };
}
/** Idempotent: at most one star of each kind per lesson, however often it is replayed. Guests keep stars only in memory. */
export function awardStar(storage: Store, uid: string | undefined, current: Awards, key: string, kind: StarKind): Awards {
  if (current.stars[key]?.[kind]) return current;
  const next: Awards = { ...current, stars: { ...current.stars, [key]: { ...current.stars[key], [kind]: true } } };
  write(storage, uid, awardsKey(uid || ''), next);
  return next;
}
export function cleanName(value: unknown) {
  return typeof value === 'string' ? value.normalize('NFKC').replace(/[^\p{L}\p{M}\p{N}\s'-]/gu, '').replace(/\s+/g, ' ').trim().slice(0, 30) : '';
}
export function saveName(storage: Store, uid: string | undefined, current: Awards, name: string): Awards {
  const next = { ...current, name: cleanName(name) || DEFAULT_NAME };
  write(storage, uid, awardsKey(uid || ''), next);
  return next;
}
export const starCount = (awards: Awards) => Object.values(awards.stars).reduce((sum, s) => sum + (s.explain ? 1 : 0) + (s.correction ? 1 : 0), 0);
export const earnedCertificate = (completed: readonly number[]) => Array.from({ length: LAST_LESSON_ID }, (_, i) => i + 1).every(id => completed.includes(id));

/** The explanation star needs Badr's grounded understanding (validated in parseReply against Abboud's actual words). */
export const explanationStar = (stage: string, reply: Reply) => stage === 'answer' && reply.verdict === 'accurate' && !!reply.understood;
/** The correction star needs the AI's accurate verdict AND the student really repeating the corrected form. */
export function correctionStar(stage: string, reply: Reply, mistake: Misconception | null) {
  if (stage !== 'correct' || reply.verdict !== 'accurate' || !mistake) return false;
  const repeat = reply.turns.find(t => t.speaker === mistake.speaker);
  return !!repeat && saysPhrase(repeat.text, mistake.correct) && !saysPhrase(repeat.text, mistake.incorrect);
}

const ENGLISH = /[A-Za-z]+(?:['’][A-Za-z]+)?/g;
export function buildReport(messages: readonly Message[], lesson: string, stars: number, praise: Praise | undefined, now = new Date()): SessionReport {
  const said = messages.filter(m => m.speaker === 'abboud').map(m => m.text);
  const words: string[] = [];
  for (const text of said) for (const word of text.match(ENGLISH) || []) {
    const w = word.toLowerCase().replace('’', "'");
    if (!words.includes(w)) words.push(w);
  }
  const first = said[0] || '';
  return {
    at: now.toISOString(), lesson, explained: first.length > 160 ? `${first.slice(0, 159)}…` : first,
    englishWords: words.slice(0, 20), englishTurns: said.filter(t => /[A-Za-z]{2,}/.test(t)).length, abboudTurns: said.length, stars,
    ...(praise ? { strength: `${praise.strength} «${praise.quote}»`, tip: praise.tip } : {})
  };
}
export function readReports(storage: Store, uid?: string): SessionReport[] {
  const data = uid ? read(storage, reportsKey(uid)) : null;
  if (!Array.isArray(data)) return [];
  return data.filter((r): r is SessionReport => isRecord(r) && typeof r.at === 'string' && typeof r.lesson === 'string' && typeof r.explained === 'string'
    && Array.isArray(r.englishWords) && r.englishWords.every(w => typeof w === 'string') && typeof r.englishTurns === 'number' && typeof r.abboudTurns === 'number' && typeof r.stars === 'number').slice(0, REPORTS_KEPT);
}
export function saveReport(storage: Store, uid: string | undefined, report: SessionReport): SessionReport[] {
  const next = [report, ...readReports(storage, uid)].slice(0, REPORTS_KEPT);
  write(storage, uid, reportsKey(uid || ''), next);
  return next;
}
export function reportText(report: SessionReport, name: string) {
  const date = new Date(report.at);
  return [
    `📋 ملخص حصة «عبود المعلّم» — ${name}`,
    `📅 ${Number.isNaN(date.getTime()) ? report.at : date.toLocaleDateString('ar-SA-u-ca-gregory')}`,
    `📚 الدرس: ${report.lesson}`,
    `🎙️ ماذا شرح: ${report.explained || '—'}`,
    `🔤 كلمات إنجليزية استخدمها: ${report.englishWords.length ? report.englishWords.join('، ') : 'لا توجد'}`,
    `🗣️ تكلّم بالإنجليزي في ${report.englishTurns} من ${report.abboudTurns} مرات كلامه`,
    `⭐ نجوم الحصة: ${report.stars}`,
    ...(report.strength ? [`👩🏻‍🏫 سارة: ${report.strength}`] : []),
    `💡 نصيحة سارة: ${report.tip || 'لا توجد هذه المرة'}`
  ].join('\n');
}
export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed';
/** Web Share when the device has it, else the clipboard. The parent chooses where it goes; nothing is sent automatically. */
export async function shareText(text: string, nav: Partial<Pick<Navigator, 'share' | 'clipboard'>> = navigator): Promise<ShareResult> {
  if (typeof nav.share === 'function') {
    try { await nav.share({ title: 'ملخص حصة عبود المعلّم', text }); return 'shared'; }
    catch (error) { if ((error as { name?: string } | null)?.name === 'AbortError') return 'cancelled'; }
  }
  if (typeof nav.clipboard?.writeText === 'function') {
    try { await nav.clipboard.writeText(text); return 'copied'; } catch { /* fall through */ }
  }
  return 'failed';
}
