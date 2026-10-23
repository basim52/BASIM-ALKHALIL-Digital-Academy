// Validates Sara's skill tracks: listening, pronunciation, vocabulary, daily life.
import { LISTENING_LESSONS } from '../src/data/saraTracks/listening';
import { PRONUNCIATION_LESSONS } from '../src/data/saraTracks/pronunciation';
import { VOCAB_LESSONS } from '../src/data/saraTracks/vocabulary';
import { DAILY_LESSONS } from '../src/data/saraTracks/dailyLife';
import { FILL_BLANK_LESSONS } from '../src/data/saraTracks/fillBlank';
import { textTrigrams } from '../src/server/lessonTextNorm';
const per: Record<string, number> = { listening: 0, pronunciation: 0, vocabulary: 0, daily: 0, fillBlank: 0 };
let track = '';
const err = (m: string) => { per[track]++; console.log('ERROR', track, m); };
const AR = /[\u0600-\u06FF]/, SYM = /[↗↘→←_\/ˈˌ]/;
const norm = (s: string) => s.trim().toLowerCase().replace(/[,!?؟،]|\.$/g, '');
const exact = (s: string) => s.trim();
// irregular forms used in examples (teeth, stole, found out, came up with, brought about)
const IRREG: Record<string, string> = { tooth: 'teeth', steal: 'stole', 'find out': 'found out', 'come up with': 'came up with', 'bring about': 'brought about' };
const base = (ls: { id: string; order: number; levelId: string; titleAr: string; titleEn: string }[]) => {
  const ids = new Set<string>();
  ls.forEach((l, i) => {
    if (l.order !== i + 1) err(`${l.id}: order ${l.order} != ${i + 1}`);
    if (ids.has(l.id)) err(`${l.id}: duplicate id`); ids.add(l.id);
    if (!l.titleAr || !l.titleEn) err(`${l.id}: missing title`);
  });
  for (const lv of 'abcd') { const n = ls.filter(l => l.levelId === lv).length; if (n && n !== 30) err(`level ${lv}: ${n} lessons`); }
  console.log(`${track}: lessons ${ls.length}`, [...'abcd'].map(lv => `${lv}=${ls.filter(l => l.levelId === lv).length}`).join(' '));
};
const opts = (id: string, o: string[], ci: number, min: number, key = norm) => {
  if (!Array.isArray(o) || o.length < min) err(`${id}: needs ≥${min} options (${o?.length})`);
  if (!(ci >= 0 && ci < o.length)) err(`${id}: answer out of range`);
  if (new Set(o.map(key)).size !== o.length) err(`${id}: duplicate options ${JSON.stringify(o)}`);
  if (o.some(x => !x || !x.trim())) err(`${id}: empty option`);
};
track = 'listening'; base(LISTENING_LESSONS);
LISTENING_LESSONS.forEach(l => {
  if (!l.audioText?.trim()) err(`${l.id}: empty audio`);
  if (SYM.test(l.audioText) || AR.test(l.audioText) || /\w\([a-z]\)\w|\b[A-Z]{4,}\b/.test(l.audioText.replace(/\b(NASA|UNESCO|FIFA|LEAP|IELTS|TOEFL|KAEC)\b/g, ''))) err(`${l.id}: audio has notation/Arabic: ${l.audioText.slice(0, 60)}`);
  // dictation is played on its own, so it may paraphrase the audio; it must be clean English of ≥3 words
  if (!l.dictation || AR.test(l.dictation) || SYM.test(l.dictation) || l.dictation.split(/\s+/).length < 3) err(`${l.id}: bad dictation ${l.dictation}`);
  if (l.questions.length !== 3) err(`${l.id}: ${l.questions.length} questions`);
  const qk = new Set<string>();
  l.questions.forEach((q, k) => {
    const id = `${l.id} q${k + 1}`;
    if (!q.questionAr && !q.questionEn) err(`${id}: no prompt`);
    if (qk.has(q.questionAr + q.questionEn)) err(`${id}: duplicate question`); qk.add(q.questionAr + q.questionEn);
    opts(id, q.options, q.correctIndex, 3);
  });
});
track = 'pronunciation'; base(PRONUNCIATION_LESSONS);
PRONUNCIATION_LESSONS.forEach(l => {
  if (!l.ideaAr || !l.sayEn) err(`${l.id}: missing idea/say`);
  if (AR.test(l.sayEn)) err(`${l.id}: Arabic in sayEn`);
  if (!l.pairs && !l.words?.length) err(`${l.id}: no pairs/words`);
  l.pairs?.forEach(p => { if (norm(p[0]) === norm(p[1])) err(`${l.id}: identical pair ${p[0]}`); });
  if (l.exercises.length < 2 || l.exercises.length > 6) err(`${l.id}: ${l.exercises.length} exercises`);
  const ek = new Set<string>();
  l.exercises.forEach((e, k) => {
    const id = `${l.id} ex${k + 1}`;
    opts(id, e.options, e.correctIndex, 2, exact); // stress patterns differ only by case
    const key = e.promptAr + '|' + (e.play || '') + '|' + [...e.options].sort().join('/');
    if (ek.has(key)) err(`${id}: duplicate exercise`); ek.add(key);
    if (/اسمع/.test(e.promptAr) && !e.play) err(`${id}: says listen but nothing to play`);
    if (/أي كلمة قالت|أي جملة قالت/.test(e.promptAr) && e.play && norm(e.options[e.correctIndex]) !== norm(e.play)) err(`${id}: answer ≠ played word`);
  });
});
track = 'vocabulary'; base(VOCAB_LESSONS);
VOCAB_LESSONS.forEach(l => {
  if (l.words.length !== 10) err(`${l.id}: ${l.words.length} words`);
  const en = new Set<string>(), ar = new Set<string>();
  l.words.forEach(w => {
    if (!w.en || !w.ar || !w.emoji || !w.example) err(`${l.id}: incomplete word ${w.en}`);
    if (en.has(norm(w.en))) err(`${l.id}: duplicate word ${w.en}`); en.add(norm(w.en));
    if (ar.has(w.ar.trim())) err(`${l.id}: duplicate meaning ${w.ar}`); ar.add(w.ar.trim());
    if (AR.test(w.en) || AR.test(w.example)) err(`${l.id}: Arabic in English ${w.en}`);
    const stem = norm(w.en).split(/\s+/)[0].slice(0, Math.max(3, norm(w.en).split(/\s+/)[0].length - 2));
    if (!norm(w.example).includes(stem) && !(IRREG[norm(w.en)] && norm(w.example).includes(IRREG[norm(w.en)]))) err(`${l.id}: example lacks word "${w.en}": ${w.example}`);
  });
});
track = 'daily'; base(DAILY_LESSONS);
DAILY_LESSONS.forEach(l => {
  if (!l.introAr) err(`${l.id}: no intro`);
  if (l.phrases.length < 3) err(`${l.id}: ${l.phrases.length} phrases`);
  const pe = new Set<string>(), pa = new Set<string>();
  l.phrases.forEach(p => {
    if (!p.en || !p.ar) err(`${l.id}: incomplete phrase`);
    if (AR.test(p.en)) err(`${l.id}: Arabic in phrase en ${p.en}`);
    if (pe.has(norm(p.en))) err(`${l.id}: duplicate phrase ${p.en}`); pe.add(norm(p.en));
    if (pa.has(p.ar.trim())) err(`${l.id}: duplicate phrase meaning ${p.ar}`); pa.add(p.ar.trim());
  });
  if (l.dialogue.length < 4) err(`${l.id}: dialogue ${l.dialogue.length}`);
  if (!l.dialogue.some(d => d.sp === 'A') || !l.dialogue.some(d => d.sp === 'B')) err(`${l.id}: needs A and B`);
  l.dialogue.forEach((d, k) => {
    if (!d.en || !d.ar) err(`${l.id}: empty line ${k}`);
    if (AR.test(d.en)) err(`${l.id}: Arabic in line en ${k}`);
    if (k && d.sp === l.dialogue[k - 1].sp) err(`${l.id}: line ${k + 1} same speaker twice`);
  });
  const bs = l.dialogue.filter(d => d.sp === 'B').map(d => norm(d.en));
  if (new Set(bs).size !== bs.length) err(`${l.id}: duplicate B replies`);
});
track = 'fillBlank';
{ const ids = new Set<string>();
  FILL_BLANK_LESSONS.forEach((l, i) => {
    if (l.order !== i + 1) err(`${l.id}: order ${l.order} != ${i + 1}`);
    if (ids.has(l.id)) err(`${l.id}: duplicate id`); ids.add(l.id);
    if (!l.titleAr || !l.titleEn || !l.introAr || !l.introEn) err(`${l.id}: missing title/intro`);
    if (l.cards.length !== 8) err(`${l.id}: ${l.cards.length} cards (need 8)`);
    const seenEn = new Set<string>(), seenAr = new Set<string>();
    l.cards.forEach((c, k) => {
      const id = `${l.id} card${k + 1}`;
      if (AR.test(c.en) || AR.test(c.sayAsk) || AR.test(c.sayRight) || AR.test(c.sayReveal)) err(`${id}: Arabic in English`);
      if (!AR.test(c.ar)) err(`${id}: missing Arabic meaning`);
      if (seenEn.has(norm(c.en))) err(`${id}: duplicate sentence`); seenEn.add(norm(c.en));
      if (seenAr.has(c.ar.trim())) err(`${id}: duplicate meaning`); seenAr.add(c.ar.trim());
      const hits = c.en.split(/\s+/).filter(w => w === c.answer).length;
      if (hits !== 1) err(`${id}: answer "${c.answer}" must appear once in "${c.en}"`);
      opts(id, c.options, c.options.indexOf(c.answer), 3);
      if (c.options.length !== 3) err(`${id}: needs exactly 3 options`);
      const blanked = c.en.replace(new RegExp(`\\b${c.answer}\\b`), '...');
      const end = /[?!.]$/.test(c.en) ? '' : '.';
      if (c.sayAsk !== `${blanked}${end} Which word is missing?`) err(`${id}: sayAsk ≠ blanked sentence: ${c.sayAsk}`);
      if (` ${blanked} `.replace(/[?!.,]/g, ' ').includes(` ${c.answer} `)) err(`${id}: sayAsk gives the answer away`);
      if (c.sayRight !== `Excellent! ${c.en}${end}`) err(`${id}: sayRight mismatch`);
      if (c.sayReveal !== `The answer is ${c.answer}. ${c.en}${end}`) err(`${id}: sayReveal mismatch`);
      // ≥2 word trigrams so the no-token lesson-voice allow-list accepts each spoken line
      for (const s of [c.sayAsk, c.sayRight, c.sayReveal]) if (textTrigrams(s).length < 2) err(`${id}: spoken line too short for allow-list: ${s}`);
    });
  });
  console.log(`fillBlank: lessons ${FILL_BLANK_LESSONS.length}, cards ${FILL_BLANK_LESSONS.reduce((a, l) => a + l.cards.length, 0)}`);
}
console.log('errors per track:', JSON.stringify(per));
const total = Object.values(per).reduce((a, b) => a + b, 0);
console.log('errors:', total); process.exit(total ? 1 : 0);
