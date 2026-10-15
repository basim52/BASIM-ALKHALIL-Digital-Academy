import { SARA_ACTIVE_CONVERSATION_LESSONS } from '../saraCurriculum/conversationLessons';
import { SARA_SPOKEN_GRAMMAR_LESSONS } from '../saraCurriculum/grammarLessons';
import { SARA_READING_PHONETICS_LESSONS } from '../saraCurriculum/readingLessons';
import { SARA_CONVERSATIONAL_WRITING_LESSONS } from '../saraCurriculum/writingLessons';
import type { SaraCurriculumLesson } from '../saraCurriculum/types';
import type { SaraCefr, SaraQuestion } from '../saraCurriculum/types';
import { LISTENING_L3 } from './listeningL3';
import { LISTENING_L4 } from './listeningL4';

export interface SaraListeningLesson {
  id: string; order: number; levelId: 'a' | 'b' | 'c' | 'd'; titleAr: string; titleEn: string; cefr?: SaraCefr;
  /** Spoken by Sara's cloud voice (speaker names removed). */
  audioText: string;
  /** Shown only after answering. */
  scriptLines: string[];
  questions: SaraQuestion[];
  /** Sentence the student writes after hearing it. */
  dictation: string;
}

const RANK: Record<string, number> = { 'Pre-A1': 0, A1: 1, A2: 2, B1: 3, B2: 4 };
const strip = (line: string) => line.replace(/^[^:]{1,20}:\s*/, '').trim();

const toListening = (src: SaraCurriculumLesson[], level: 'a' | 'b', start: number): SaraListeningLesson[] => src.map((l, i) => {
  const lines = l.listeningTask!.script.split('\n').map(s => s.trim()).filter(Boolean);
  const spoken = lines.map(strip).map(x => x.replace(/[↗↘→←↑↓]/g, '').replace(/\/[^/]+\//g, '').replace(/_/g, ' ').replace(/\s+/g, ' ').replace(/ ([.,?!])/g, '$1').trim()).filter(Boolean);
  const dictation = [...spoken].filter(s => s.split(/\s+/).length >= 3).sort((a, b) => a.length - b.length)[0] || spoken[0];
  return { id: `listen-${level}-${String(i + 1).padStart(2, '0')}`, order: start + i, levelId: level, titleAr: l.titleAr, titleEn: l.titleEn, cefr: l.cefr,
    audioText: spoken.join(' '), scriptLines: lines, questions: l.listeningTask!.questions.slice(0, 3), dictation };
});
const byRank = (a: SaraCurriculumLesson, b: SaraCurriculumLesson) => (RANK[a.cefr || 'B1'] - RANK[b.cefr || 'B1']) || a.id.localeCompare(b.id);
const ok = (l: SaraCurriculumLesson) => !!l.listeningTask && l.listeningTask.questions.length >= 3;

/** Level 1: the 30 conversation dialogues (Pre-A1 → B2), easiest first. Level 2: the B1/B2 listening texts of the other tracks (chats, emails, talks). */
export const LISTENING_LESSONS: SaraListeningLesson[] = [
  ...toListening([...SARA_ACTIVE_CONVERSATION_LESSONS].filter(ok).sort(byRank).slice(0, 30), 'a', 1),
  ...toListening([...SARA_SPOKEN_GRAMMAR_LESSONS, ...SARA_READING_PHONETICS_LESSONS, ...SARA_CONVERSATIONAL_WRITING_LESSONS]
    .filter(l => ok(l) && (l.cefr === 'B1' || l.cefr === 'B2')).sort(byRank).slice(0, 30), 'b', 31),
  ...LISTENING_L3,
  ...LISTENING_L4,
];

export const LISTENING_TRACK_ID = 'listening';
export const LISTENING_TITLE_AR = 'الاستماع';
