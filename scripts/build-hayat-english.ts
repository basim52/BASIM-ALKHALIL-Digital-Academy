import fs from 'node:fs';
import { hayatBank, hayatSources, firstSentence } from '../src/data/hayat/questions';
/** Builds public/hayat/en-prompts.json: English stems + English explanations for Hayat's lesson questions, taken from the site's own AR→EN table (public/i18n/en.json). */
const en: Record<string, string> = JSON.parse(fs.readFileSync('public/i18n/en.json', 'utf8'));
const p: Record<string, string> = {}; const x: Record<string, string> = {};
for (const q of hayatBank()) if (q.kind === 'choice' && !q.promptEn && en[q.promptAr]) p[q.promptAr] = en[q.promptAr];
for (const { lesson } of hayatSources()) { const t = en[lesson.content!.explanationAr]; if (t) x[lesson.id] = firstSentence(t); }
fs.mkdirSync('public/hayat', { recursive: true });
fs.writeFileSync('public/hayat/en-prompts.json', JSON.stringify({ p, x }));
console.log('prompts', Object.keys(p).length, 'explanations', Object.keys(x).length, fs.statSync('public/hayat/en-prompts.json').size, 'bytes');
