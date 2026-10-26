import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { normalizeSpoken } from '../utils/speechAnswerCheck';

/**
 * «ردّد مع …» repeat-after-me practice: teacher config, lesson item extraction and the weak-words memory.
 * Pilot is Sara only; another teacher = another RepeatTeacher entry + her lesson extractor.
 */

/** Teacher identity for the practice screen (the narrator functions are supplied by the component's teacher config). */
export interface RepeatTeacherInfo {
  id: string;
  nameAr: string;
  /** TutorFace id. */
  face: string;
}

/** Lesson-based practice: a title for the header and the lesson's own English items. */
export interface RepeatLessonSource {
  trackId?: string;
  lessonId?: string;
  titleAr: string;
  titleEn?: string;
  items: string[];
}

export const MAX_LESSON_ITEMS = 20;
export const MAX_REVIEW_WORDS = 3;

const keyOf = (s: string) => normalizeSpoken(s).join(' ');
/** Dedupe key that also folds name-only variants ("My name is Omar." / "My name is Sara.") into one item. */
const patternKey = (s: string) => s.split(/\s+/).map((w, i) => (i > 0 && /^[A-Z][a-z]+[.,!?]*$/.test(w) && w.replace(/[^A-Za-z]/g, '') !== 'I' ? '#' : w)).join(' ').toLowerCase().replace(/[^a-z0-9#' ]/g, '').trim();

/** A clean, speakable English line: ASCII only, no IPA / arrows / blanks / maths, 1..12 words, not just letters. */
export function cleanEnglishItem(raw: string): string | null {
  let s = (raw || '').replace(/[’‘`]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim();
  s = s.replace(/^["'(\[\s-]+|["')\]\s,;:-]+$/g, '').trim();
  if (!s) return null;
  if (/[^A-Za-z0-9 ,.'?!-]/.test(s)) return null; // Arabic, IPA (/ː/ [ ]), arrows, = + / _ …
  if (/_{2,}|\.{3}|--/.test(s)) return null;
  if (/\w+-\w+-\w+|[a-z]-[A-Z]|[A-Z]{2,}-|-[A-Z]{2,}/.test(s)) return null; // stress / syllable notation: e-co-NO-mic, com-PARE
  if (!/[A-Za-z]{2,}/.test(s)) return null;
  if (!s.includes(' ')) s = s.replace(/[.,;]+$/, ''); // single word: drop the trailing full stop
  const words = s.split(' ').filter(Boolean);
  if (words.length === 1 && !/[aeiouy]/i.test(s)) return null; // sound notation like "kw", "ks", "sh"
  if (words.length > 12) return null;
  if (words.filter(w => w.replace(/[^A-Za-z]/g, '').length >= 2).length === 0) return null; // "a e i o u", "p", "B"
  if (words.length > 1 && words.filter(w => w.replace(/[^A-Za-z]/g, '').length <= 1).length > words.length / 2) return null;
  if (/^\d/.test(s)) return null;
  return s;
}

/** Split an English line into speakable sentences, dropping dialogue speaker tags ("A:", "Waiter:"). */
export function splitEnglishLine(en: string): string[] {
  return (en || '')
    .replace(/(^|\s)[A-Z][A-Za-z]{0,14}:\s+/g, '\n')
    .split(/\n|(?<=[.!?])\s+/)
    .map(x => x.trim()).filter(Boolean);
}

/** English runs embedded in an Arabic explanation, e.g. «… تقول: Nice to meet you يعني …». */
export function englishRunsInArabic(ar: string): string[] {
  return ((ar || '').match(/[A-Za-z][A-Za-z0-9'’ ,?!.-]*[A-Za-z?!.']/g) || []).flatMap(splitEnglishLine);
}

export function dedupeItems(list: (string | null | undefined)[], max = MAX_LESSON_ITEMS): string[] {
  const seen = new Set<string>(), out: string[] = [];
  for (const raw of list) {
    const c = raw ? cleanEnglishItem(raw) : null;
    if (!c) continue;
    const k = keyOf(c), pk = patternKey(c);
    if (!k || seen.has(k) || seen.has(pk)) continue;
    seen.add(k); seen.add(pk); out.push(c);
    if (out.length >= max) break;
  }
  return out;
}

const isAscii = (s: string) => !/[^\x20-\x7E’‘]/.test(s);

/** Minimal shape of a Sara track lesson (kept structural so other teachers' lessons can reuse it). */
export interface RepeatableLesson {
  id: string;
  titleAr: string;
  titleEn: string;
  content?: {
    explanationAr: string;
    example: { en: string; ar?: string }[];
    check?: { promptEn?: string; options: string[]; correctIndex: number };
    exercises?: { promptEn?: string; options: string[]; correctIndex: number }[];
  };
}

/**
 * Items from one lesson, in teaching order: words/phrases quoted in the explanation (what Sara writes on the board),
 * then the example lines, then the correct English answers of the check and exercises.
 */
export function extractLessonItems(lesson: RepeatableLesson): string[] {
  const c = lesson.content;
  if (!c) return [];
  const qs = [c.check, ...(c.exercises || [])].filter(Boolean) as NonNullable<typeof c.check>[];
  const fromQs = qs.flatMap(q => {
    const ans = q.options[q.correctIndex];
    return ans && isAscii(ans) ? splitEnglishLine(ans) : []; // promptEn is only the English translation of the instruction: skipped
  });
  return dedupeItems([
    ...englishRunsInArabic(c.explanationAr),
    ...c.example.flatMap(e => splitEnglishLine(e.en)),
    ...fromQs,
  ]);
}

/* ---------------- Last lesson (for the «فصل المعلمين» button) ---------------- */

const lastKey = (teacherId: string, uid?: string) => `repeat_last_lesson_${teacherId}_${uid || 'guest'}`;
/** Saved when a lesson is passed (any Sara track, incl. path/curriculum tracks): ids + title + its items. */
export function recordLastLesson(teacherId: string, uid: string | undefined, src: RepeatLessonSource & { trackId: string; lessonId: string }) {
  try { localStorage.setItem(lastKey(teacherId, uid), JSON.stringify({ ...src, items: src.items.slice(0, MAX_LESSON_ITEMS), at: Date.now() })); } catch { /* ignore */ }
}
export function readLastLesson(teacherId: string, uid?: string): (RepeatLessonSource & { trackId: string; lessonId: string }) | null {
  try {
    const v = JSON.parse(localStorage.getItem(lastKey(teacherId, uid)) || 'null');
    if (!v || !v.trackId || !v.lessonId) return null;
    return { trackId: v.trackId, lessonId: v.lessonId, titleAr: String(v.titleAr || ''), titleEn: v.titleEn ? String(v.titleEn) : undefined,
      items: Array.isArray(v.items) ? v.items.filter((x: any) => typeof x === 'string') : [] };
  } catch { return null; }
}

/* ---------------- Weak words memory ----------------
 * Local copy per student (always) + an additive field on the student's own Sara memory doc tutorMemory/{uid}
 * (`repeatWeakWords`, merge write; rules already allow the owner to write it; nothing else in the doc is touched).
 */

export const MAX_WEAK_WORDS = 30;
const FIELD = 'repeatWeakWords';
const weakKey = (teacherId: string, uid?: string) => `repeat_weak_${teacherId}_${uid || 'guest'}`;
// Short function words are not worth a review card on their own.
const STOP = new Set(['a', 'an', 'the', 'is', 'am', 'are', 'was', 'were', 'be', 'to', 'of', 'in', 'on', 'at', 'it', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your', 'and', 'or', 'but', 'do', 'does', 'did', 'not', 'for', 'with', 'this', 'that', 'us', 'me', 'him', 'her', 'can', 'will', 'would', 'have', 'has', 'so', 'as', 'by', 'up', 'if', 'no', 'yes']);
export const isReviewableWord = (w: string) => /^[a-z][a-z']{2,}$/.test(w) && !STOP.has(w);

function readLocalWeak(teacherId: string, uid?: string): string[] {
  try { const v = JSON.parse(localStorage.getItem(weakKey(teacherId, uid)) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
}
function writeLocalWeak(teacherId: string, uid: string | undefined, list: string[]) {
  try { localStorage.setItem(weakKey(teacherId, uid), JSON.stringify(list)); } catch { /* ignore */ }
}

/** Newest last. Cloud copy (if any) is merged with the local one. */
export async function loadWeakWords(teacherId: string, uid?: string): Promise<string[]> {
  let list = readLocalWeak(teacherId, uid);
  if (uid && teacherId === 'sara') {
    try {
      const snap = await getDoc(doc(db, 'tutorMemory', uid));
      const cloud = (snap.data() as any)?.[FIELD];
      if (Array.isArray(cloud)) {
        list = Array.from(new Set([...cloud.filter((x: any) => typeof x === 'string'), ...list])).slice(-MAX_WEAK_WORDS);
        writeLocalWeak(teacherId, uid, list); // this device now mirrors the cloud copy
      }
    } catch { /* offline / not the owner: local copy only */ }
  }
  return list;
}

/** Add weak words / drop words the student now says well. Returns the saved list. */
export async function updateWeakWords(teacherId: string, uid: string | undefined, add: string[], remove: string[]): Promise<string[]> {
  const rm = new Set(remove);
  const before = readLocalWeak(teacherId, uid);
  const cur = before.filter(w => !rm.has(w));
  const addOk = Array.from(new Set(add.filter(isReviewableWord).filter(w => !rm.has(w))));
  const list = [...cur.filter(w => !addOk.includes(w)), ...addOk].slice(-MAX_WEAK_WORDS);
  if (JSON.stringify(list) === JSON.stringify(before)) return list; // nothing changed: no write
  writeLocalWeak(teacherId, uid, list);
  if (uid && teacherId === 'sara' && auth.currentUser?.uid === uid) { // only the signed-in student writes her own doc
    try { await setDoc(doc(db, 'tutorMemory', uid), { [FIELD]: list, repeatWeakUpdatedAt: serverTimestamp() }, { merge: true }); } catch { /* local copy kept */ }
  }
  return list;
}

/** Up to MAX_REVIEW_WORDS previous weak words that are not already in this session's items (most recent first). */
export function pickReviewWords(weak: string[], items: string[]): string[] {
  const inItems = new Set(items.map(keyOf));
  return weak.slice().reverse().filter(w => !inItems.has(w)).slice(0, MAX_REVIEW_WORDS);
}
