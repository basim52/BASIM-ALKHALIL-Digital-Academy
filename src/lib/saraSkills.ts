import { loadTrackProgress } from './saraProgressSync';
import { loadLevelTestAttempts, summarizeLevelTests } from './saraLevelTests';
import { FOUNDATIONS_TRACK } from '../data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../data/saraTracks/conversation';
import { READING_TRACK } from '../data/saraTracks/reading';
import { WRITING_TRACK } from '../data/saraTracks/writing';
import type { SaraTrack } from '../data/saraTracks/foundations';

export interface SaraSkill { id: 'grammar' | 'conversation' | 'reading' | 'writing'; labelAr: string; labelEn: string; passed: number; total: number; pct: number; testBest: number | null }
export interface SaraSkills { skills: SaraSkill[]; hasData: boolean; placementLevel: string | null }

const SKILLS: { id: SaraSkill['id']; labelAr: string; labelEn: string; tracks: SaraTrack[] }[] = [
  { id: 'grammar', labelAr: 'القواعد 🧠', labelEn: 'Grammar 🧠', tracks: [FOUNDATIONS_TRACK, ADVANCED_TRACK] },
  { id: 'conversation', labelAr: 'المحادثة 💬', labelEn: 'Conversation 💬', tracks: [CONVERSATION_TRACK] },
  { id: 'reading', labelAr: 'القراءة والنطق 📖', labelEn: 'Reading 📖', tracks: [READING_TRACK] },
  { id: 'writing', labelAr: 'الكتابة ✍️', labelEn: 'Writing ✍️', tracks: [WRITING_TRACK] },
];

/** Real per-skill values: lessons passed per Sara track (cloud ∪ this device), best level-test score, placement level. No sample numbers. */
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
    const best = tests.filter(x => s.tracks.some(t => t.id === x.trackId)).map(x => x.best.score);
    return { id: s.id, labelAr: s.labelAr, labelEn: s.labelEn, passed, total, pct: total ? Math.round((passed / total) * 100) : 0, testBest: best.length ? Math.max(...best) : null };
  });
  return { skills, hasData: skills.some(s => s.passed > 0 || s.testBest !== null), placementLevel: placementLevel || null };
}
