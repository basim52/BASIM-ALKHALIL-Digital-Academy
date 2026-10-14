import { SARA_ACTIVE_CONVERSATION_LESSONS } from '../saraCurriculum/conversationLessons';
import type { SaraCefr, SaraQuestion } from '../saraCurriculum/types';

export interface SaraListeningLesson {
  id: string; order: number; titleAr: string; titleEn: string; cefr?: SaraCefr;
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

/** Listening — Level 1: 30 dialogues from the authored listening tasks, easiest first. */
export const LISTENING_LESSONS: SaraListeningLesson[] = [...SARA_ACTIVE_CONVERSATION_LESSONS]
  .filter(l => l.listeningTask && l.listeningTask.questions.length >= 3)
  .sort((a, b) => (RANK[a.cefr || 'B1'] - RANK[b.cefr || 'B1']) || a.id.localeCompare(b.id))
  .slice(0, 30)
  .map((l, i) => {
    const lines = l.listeningTask!.script.split('\n').map(s => s.trim()).filter(Boolean);
    const spoken = lines.map(strip);
    const dictation = [...spoken].filter(s => s.split(/\s+/).length >= 3).sort((a, b) => a.length - b.length)[0] || spoken[0];
    return { id: `listen-a-${String(i + 1).padStart(2, '0')}`, order: i + 1, titleAr: l.titleAr, titleEn: l.titleEn, cefr: l.cefr,
      audioText: spoken.join(' '), scriptLines: lines, questions: l.listeningTask!.questions.slice(0, 3), dictation };
  });

export const LISTENING_TRACK_ID = 'listening';
export const LISTENING_TITLE_AR = 'الاستماع';
