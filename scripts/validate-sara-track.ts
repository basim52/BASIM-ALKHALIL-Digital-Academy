// Validates Sara's foundations track: all fields, answers in range, 3–4 exercises, no duplicate questions.
import { FOUNDATIONS_TRACK } from '../src/data/saraTracks/foundations';
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
const counts: string[] = [];
FOUNDATIONS_TRACK.lessons.forEach((l, i) => {
  if (l.order !== i + 1) err(`${l.id}: order ${l.order} != ${i + 1}`);
  const c = l.content;
  if (!c) return err(`${l.id}: no content`);
  if (!l.titleAr || !l.titleEn) err(`${l.id}: missing title`);
  if (!c.explanationAr || !c.altExplanationAr) err(`${l.id}: missing explanation/alt`);
  if (c.explanationAr === c.altExplanationAr) err(`${l.id}: alt equals explanation`);
  if (!Array.isArray(c.example) || c.example.length !== 2 || c.example.some(e => !e.en || !e.ar)) err(`${l.id}: example needs 2 lines en+ar`);
  checkQ(l.id, 'check', c.check);
  if (c.exercises.length < 3 || c.exercises.length > 4) err(`${l.id}: exercises ${c.exercises.length}`);
  c.exercises.forEach((e, k) => checkQ(l.id, `ex${k + 1}`, e));
  counts.push(`${l.order}:${c.exercises.length}`);
});
console.log('lessons:', FOUNDATIONS_TRACK.lessons.length, 'exercise counts:', counts.join(' '));
console.log('errors:', errors);
process.exit(errors ? 1 : 0);
