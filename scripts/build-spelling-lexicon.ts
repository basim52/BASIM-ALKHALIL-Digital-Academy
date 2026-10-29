// Collect every single English word that already has an Arabic meaning in the lesson data (examples, kids cards, visual dictionary).
// Output: src/data/spellingLexicon.json (word → Arabic). Run: npx tsx scripts/build-spelling-lexicon.ts
import { writeFileSync } from 'fs';
import { FOUNDATIONS_TRACK } from '../src/data/saraTracks/foundations';
import { ADVANCED_TRACK } from '../src/data/saraTracks/advanced';
import { CONVERSATION_TRACK } from '../src/data/saraTracks/conversation';
import { READING_TRACK } from '../src/data/saraTracks/reading';
import { WRITING_TRACK } from '../src/data/saraTracks/writing';
import { TUTOR_TRACKS } from '../src/data/tutorTracks/index';
import { VISUAL_DICTIONARY } from '../src/data/visualDictionary';

const out: Record<string, string> = {}; const seen: Record<string, Set<string>> = {};
const add = (en: string, ar: string) => {
  const w = en.trim().replace(/[.!?]$/, '').toLowerCase();
  if (!/^[a-z]{3,12}$/.test(w) || !/[\u0600-\u06FF]/.test(ar) || /[A-Za-z]/.test(ar)) return;
  (seen[w] ??= new Set()).add(ar.trim());
};
for (const t of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK, ...TUTOR_TRACKS] as any[])
  for (const l of t.lessons) { for (const e of l.content?.example || []) add(e.en, e.ar); for (const k of l.kids?.cards || []) add(k.en, k.ar); }
for (const c of VISUAL_DICTIONARY) for (const it of c.items) add(it.word, it.meaning_ar);
// keep the first meaning; skip words the data gives conflicting meanings for only if there are more than 2 (ambiguous)
for (const [w, s] of Object.entries(seen).sort()) if (s.size <= 2) out[w] = [...s][0];
writeFileSync('src/data/spellingLexicon.json', JSON.stringify(out));
console.log(Object.keys(out).length, 'words');
