// Validates Sara's foundations track: all fields, answers in range, 3–4 exercises, no duplicate questions.
import { FOUNDATIONS_TRACK } from '../src/data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../src/data/saraTracks/conversation';
import { READING_TRACK } from '../src/data/saraTracks/reading';
import { WRITING_TRACK } from '../src/data/saraTracks/writing';
let errors = 0;
const seen = new Map<string, string>();
const err = (m: string) => { errors++; console.log('ERROR', m); };
const checkQ = (id: string, label: string, q: any) => {
  if (!q?.promptAr) err(`${id} ${label}: missing promptAr`);
  if (!Array.isArray(q?.options) || q.options.length !== 3) err(`${id} ${label}: needs 3 options`);
  if (!(q?.correctIndex >= 0 && q.correctIndex < (q?.options?.length || 0))) err(`${id} ${label}: answer not among options`);
  if (new Set(q?.options).size !== q?.options?.length) err(`${id} ${label}: duplicate options`);
  const key = `${q.promptAr}|${q.promptEn || ''}|${(q.options || []).join('/')}`;
  if (seen.has(key)) err(`${id} ${label}: duplicate of ${seen.get(key)}`); else seen.set(key, `${id} ${label}`);
};
for (const TRACK of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK]) {
const counts: string[] = [];
const ids = new Set<string>();
let titlesOnly = 0;
TRACK.lessons.forEach((l, i) => {
  if (l.order !== i + 1) err(`${l.id}: order ${l.order} != ${i + 1}`);
  if (ids.has(l.id)) err(`${l.id}: duplicate id`); ids.add(l.id);
  if (!l.titleAr || !l.titleEn) err(`${l.id}: missing title`);
  if (TRACK.levels && !TRACK.levels.some(v => v.id === l.levelId)) err(`${l.id}: unknown level`);
  const c = l.content;
  if (!c) { err(`${l.id}: no content`); titlesOnly++; return; }
  if (!c.explanationAr || !c.altExplanationAr) err(`${l.id}: missing explanation/alt`);
  if (c.explanationAr === c.altExplanationAr) err(`${l.id}: alt equals explanation`);
  if (!Array.isArray(c.example) || c.example.length < 2 || c.example.length > 4 || c.example.some(e => !e.en || !e.ar)) err(`${l.id}: example needs 2–4 lines en+ar`);
  if (TRACK.id === 'reading' || TRACK.id === 'writing') {
    // narrated fields must never contain pronunciation notation (Sara reads them aloud)
    const narrated = [c.explanationAr, c.altExplanationAr, ...c.example.map(e => e.en + ' ' + e.ar)];
    narrated.forEach(t => { if (/[↗↘→_=\/ˈˌ]|\b[a-z]*-?[A-Z]{2,}-[a-z]/.test(t)) err(`${l.id}: pronunciation symbols in narrated text: ${t.slice(0, 40)}`); });
  }
  checkQ(l.id, 'check', c.check);
  if (c.exercises.length < 3 || c.exercises.length > 4) err(`${l.id}: exercises ${c.exercises.length}`);
  c.exercises.forEach((e, k) => checkQ(l.id, `ex${k + 1}`, e));
  counts.push(`${l.order}:${c.exercises.length}`);
});
if (TRACK.levels) TRACK.levels.forEach(v => console.log(`  level ${v.id}: ${TRACK.lessons.filter(l => l.levelId === v.id).length} lessons, ${TRACK.lessons.filter(l => l.levelId === v.id && l.content).length} built`));
console.log(`${TRACK.id}: lessons ${TRACK.lessons.length}, built ${counts.length}, titles-only ${titlesOnly}, exercises ${counts.reduce((a, c) => a + Number(c.split(':')[1]), 0)}`);
console.log('  exercise counts:', counts.join(' '));
}
console.log('errors:', errors);
process.exit(errors ? 1 : 0);
