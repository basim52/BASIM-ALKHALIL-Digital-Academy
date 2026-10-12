// Verifies: for every lesson in every track and both languages, each whiteboard
// page's speech is derived 1:1 (same content, same order) from its board lines.
import { ALL_SARA_EXCLUSIVE_LESSONS } from '../src/data/saraCurriculum';
import { buildSaraExclusiveLessonExplanation } from '../src/utils/saraExclusiveExplainer';
import { boardLineToSpeech, boardLinesToSpeech } from '../src/utils/boardToSpeech';
import { buildLessonPageSpeech } from '../src/utils/saraBoardSpeech';

const counts: Record<string, number> = {};
let mismatches = 0, pages = 0;
for (const lesson of ALL_SARA_EXCLUSIVE_LESSONS) {
  counts[lesson.pillarId] = (counts[lesson.pillarId] || 0) + 1;
  for (const lang of ['ar', 'en'] as const) {
    const { boardData } = buildSaraExclusiveLessonExplanation(lesson, lang);
    const board = boardData.pageBoard || {};
    const speech = buildLessonPageSpeech(lesson, lang);
    const secs = Object.keys(board) as (keyof typeof board)[];
    if (secs.length < 5) { mismatches++; console.log('MISSING pages', lesson.id, lang); }
    for (const k of secs) {
      pages++;
      const lines = board[k]!;
      const s = speech[k] || '';
      const derived = boardLinesToSpeech(lines);
      // order + content: every board line's spoken form appears, in order, and nothing else
      let pos = 0, ok = s === derived;
      for (const l of lines) { const t = boardLineToSpeech(l); const i = s.indexOf(t, pos); if (i < 0) { ok = false; break; } pos = i + t.length; }
      if (!ok) { mismatches++; console.log('MISMATCH', lesson.id, lang, k); }
    }
  }
}
console.log('lessons per track:', counts);
console.log('lessons:', ALL_SARA_EXCLUSIVE_LESSONS.length, 'pages checked:', pages, 'mismatches:', mismatches);
process.exit(mismatches ? 1 : 0);
