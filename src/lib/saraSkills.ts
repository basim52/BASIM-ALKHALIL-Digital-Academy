import { loadTrackProgress } from './saraProgressSync';
import { loadLevelTestAttempts, summarizeLevelTests } from './saraLevelTests';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import type { SaraTrack } from '../data/saraTracks/foundations';
import { LISTENING_LESSONS, LISTENING_TRACK_ID } from '../data/saraTracks/listening';
import { DAILY_LESSONS, DAILY_TRACK_ID } from '../data/saraTracks/dailyLife';
import { VOCAB_LESSONS, VOCAB_TRACK_ID } from '../data/saraTracks/vocabulary';
import { PRONUNCIATION_LESSONS, PRONUNCIATION_TRACK_ID } from '../data/saraTracks/pronunciation';

const LISTENING_AS_TRACK = { id: LISTENING_TRACK_ID, titleAr: 'الاستماع', titleEn: 'Listening', lessons: LISTENING_LESSONS.map(l => ({ id: l.id, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn })) } as SaraTrack;
const DAILY_AS_TRACK = { id: DAILY_TRACK_ID, titleAr: 'الحياة اليومية', titleEn: 'Everyday English', lessons: DAILY_LESSONS.map(l => ({ id: l.id, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn })) } as SaraTrack;
const VOCAB_AS_TRACK = { id: VOCAB_TRACK_ID, titleAr: 'المفردات', titleEn: 'Vocabulary', lessons: VOCAB_LESSONS.map(l => ({ id: l.id, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn })) } as SaraTrack;
const PRON_AS_TRACK = { id: PRONUNCIATION_TRACK_ID, titleAr: 'النطق', titleEn: 'Pronunciation', lessons: PRONUNCIATION_LESSONS.map(l => ({ id: l.id, order: l.order, titleAr: l.titleAr, titleEn: l.titleEn })) } as SaraTrack;

export interface SaraSkill { id: 'grammar' | 'conversation' | 'reading' | 'writing' | 'listening' | 'pronunciation' | 'vocabulary' | 'daily'; labelAr: string; labelEn: string; passed: number; total: number; pct: number; testBest: number | null }
export interface SaraSkills { skills: SaraSkill[]; exam: SaraExamItem[]; hasData: boolean; placementLevel: string | null }

/** Level-1 tracks with their own players (listening, pronunciation, vocabulary, everyday English), as SaraTrack shapes for reports. */
export const NEW_SKILL_TRACKS: SaraTrack[] = [LISTENING_AS_TRACK, PRON_AS_TRACK, VOCAB_AS_TRACK, DAILY_AS_TRACK];

const SKILLS: { id: SaraSkill['id']; labelAr: string; labelEn: string; tracks: SaraTrack[] }[] = [
  { id: 'grammar', labelAr: 'القواعد 🧠', labelEn: 'Grammar 🧠', tracks: [FOUNDATIONS_TRACK, ADVANCED_TRACK] },
  { id: 'conversation', labelAr: 'المحادثة 💬', labelEn: 'Conversation 💬', tracks: [CONVERSATION_TRACK] },
  { id: 'reading', labelAr: 'القراءة والنطق 📖', labelEn: 'Reading 📖', tracks: [READING_TRACK] },
  { id: 'writing', labelAr: 'الكتابة ✍️', labelEn: 'Writing ✍️', tracks: [WRITING_TRACK] },
  { id: 'listening', labelAr: 'الاستماع 🎧', labelEn: 'Listening 🎧', tracks: [LISTENING_AS_TRACK] },
  { id: 'pronunciation', labelAr: 'النطق 🗣️', labelEn: 'Pronunciation 🗣️', tracks: [PRON_AS_TRACK] },
  { id: 'vocabulary', labelAr: 'المفردات 🔤', labelEn: 'Vocabulary 🔤', tracks: [VOCAB_AS_TRACK] },
  { id: 'daily', labelAr: 'الحياة اليومية 🌍', labelEn: 'Everyday English 🌍', tracks: [DAILY_AS_TRACK] },
];

/** Real per-skill values: lessons passed per Sara track (cloud ∪ this device), best level-test score, placement level. No sample numbers. */
import { loadExamResults, readExamResults, type ExamResults } from './saraExamSync';
import { EXAM_SETS } from '../data/saraTracks/examPrep';
export interface SaraExamItem { setId: string; exam: string; kind: 'reading' | 'listening'; title: string; bestCorrect: number; lastCorrect: number; total: number; bestTimeSec: number; lastTimeSec: number; limitSec: number; attempts: number }

export async function computeSaraSkills(uid: string | undefined, placementLevel?: string | null): Promise<SaraSkills> {
  const remote = uid ? await loadTrackProgress(uid) : {};
  const local = (id: string) => { try { return Number(localStorage.getItem(`sara_track_${id}_${uid || 'guest'}`)) || 1; } catch { return 1; } };
  const tests = uid ? summarizeLevelTests(await loadLevelTestAttempts(uid)).filter(s => s.trackId !== 'placement') : [];
  const skills = SKILLS.map(s => {
    let passed = 0, total = 0;
    for (const t of s.tracks) {
      const u = Math.max(Number(remote[t.id]) || 1, local(t.id));
      total += t.lessons.length; passed += Math.min(t.lessons.length, u - 1);
    }
    const best = tests.filter(x => s.tracks.some(t => t.id === x.trackId)).map(x => x.latest.score); // official result = last attempt
    return { id: s.id, labelAr: s.labelAr, labelEn: s.labelEn, passed, total, pct: total ? Math.round((passed / total) * 100) : 0, testBest: best.length ? Math.max(...best) : null };
  });
  // IELTS/STEP practice: real raw counts + time (cloud ∪ device). No band predictions.
  const er: ExamResults = { ...(uid ? await loadExamResults(uid) : {}) };
  for (const [k, v] of Object.entries(readExamResults(uid))) if (!er[k] || v.lastAt > er[k].lastAt) er[k] = v;
  const exam: SaraExamItem[] = EXAM_SETS.filter(x => er[x.id]).map(x => { const r = er[x.id]; return { setId: x.id, exam: x.exam, kind: x.kind, title: x.titleEn, bestCorrect: r.correct, lastCorrect: r.lastCorrect, total: r.total, bestTimeSec: r.timeSec, lastTimeSec: r.lastTimeSec, limitSec: x.minutes * 60, attempts: r.attempts }; });
  return { skills, exam, hasData: skills.some(s => s.passed > 0 || s.testBest !== null) || exam.length > 0, placementLevel: placementLevel || null };
}
