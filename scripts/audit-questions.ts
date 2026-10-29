// Audit every lesson question through the same normaliser the UI uses. Run: npx tsx scripts/audit-questions.ts
import { FOUNDATIONS_TRACK } from '../src/data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../src/data/saraTracks/conversation';
import { READING_TRACK } from '../src/data/saraTracks/reading';
import { WRITING_TRACK } from '../src/data/saraTracks/writing';
import { TUTOR_TRACKS } from '../src/data/tutorTracks/index';
import { normalizeChoice, choiceProblems } from '../src/lib/choiceQuestion';

const tracks: { id: string; lessons: any[] }[] = [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...TUTOR_TRACKS] as any;
let total = 0, bad = 0;
for (const t of tracks) {
  let tq = 0, tb = 0;
  for (const l of t.lessons) {
    const c = l.content; if (!c) { console.log(`${t.id} ${l.id}: no content`); continue; }
    const qs = [['check', c.check], ...(c.exercises || []).map((e: unknown, i: number) => [`ex${i + 1}`, e])] as [string, unknown][];
    if (!c.check) console.log(`${t.id} ${l.id}: missing check`);
    for (const [k, raw] of qs) {
      if (!raw) continue; tq++;
      const p = choiceProblems(normalizeChoice(raw));
      if (p.length) { tb++; console.log(`${t.id} ${l.id} ${k}: ${p.join(", ")} ${JSON.stringify(normalizeChoice(raw).options)} ci=${normalizeChoice(raw).correctIndex}`); }
    }
  }
  console.log(`== ${t.id}: ${t.lessons.length} lessons, ${tq} questions, ${tb} problems`);
  total += tq; bad += tb;
}
console.log(`TOTAL ${total} questions, ${bad} problems`);
process.exit(bad ? 1 : 0);
