import type { SaraChoiceQuestion, SaraTrackLesson } from '../saraTracks/foundations';
import { FOUNDATIONS_TRACK } from '../saraTracks/foundations';
import { ADVANCED_TRACK } from '../saraTracks/advanced';
import { CONVERSATION_TRACK } from '../saraTracks/conversation';
import { READING_TRACK } from '../saraTracks/reading';
import { WRITING_TRACK } from '../saraTracks/writing';
import { TUTOR_TRACKS, type TutorLesson } from '../tutorTracks';
import { VOCAB_LESSONS } from '../saraTracks/vocabulary';
import { SESSIONS_CONFIG } from '../../lib/abboud/curriculum';
import { normalizeChoice, choiceProblems } from '../../lib/choiceQuestion';
/**
 * مدرسة حياة — questions only, built at runtime from the lessons every class already has (no new curriculum, nothing taught).
 * Read-only over the lesson data: never touches progress, XP, unlocking or certificates. Hayat's own best scores live in localStorage.
 */
export type HayatClassId = 'sara' | 'grammar' | 'business' | 'exams' | 'lama' | 'reem' | 'haya' | 'jana' | 'lina' | 'abboud';
export type HayatClass = { id: HayatClassId; nameAr: string; nameEn: string; img: string };
export const HAYAT_CLASSES: HayatClass[] = [
  { id: 'sara', nameAr: 'سارة', nameEn: 'Sara', img: '/tutors/sara.webp' },
  { id: 'grammar', nameAr: 'نورة', nameEn: 'Noura', img: '/tutors/grammar.webp' },
  { id: 'business', nameAr: 'محمد', nameEn: 'Mohammed', img: '/tutors/business.webp' },
  { id: 'exams', nameAr: 'علي', nameEn: 'Ali', img: '/tutors/exams.webp' },
  { id: 'lama', nameAr: 'لمى', nameEn: 'Lama', img: '/tutors/lama.webp' },
  { id: 'reem', nameAr: 'ريم', nameEn: 'Reem', img: '/tutors/reem.webp' },
  { id: 'haya', nameAr: 'هيا', nameEn: 'Haya', img: '/tutors/haya.webp' },
  { id: 'jana', nameAr: 'جنى', nameEn: 'Jana', img: '/tutors/jana.webp' },
  { id: 'lina', nameAr: 'لينا', nameEn: 'Lina', img: '/tutors/lina.webp' },
  { id: 'abboud', nameAr: 'عبود', nameEn: 'Abboud', img: '/tutors/teacher-abboud.webp' },
];
export const hayatClass = (id: HayatClassId) => HAYAT_CLASSES.find(c => c.id === id)!;

export type HayatKind = 'choice' | 'picture' | 'listen' | 'tf' | 'gap' | 'order' | 'vocab' | 'hear';
/** A picture: a real lesson illustration (Lina) or a big emoji tile (card lessons, Abboud). */
export type HayatPic = { img?: string; emoji?: string };
type Base = { id: string; cls: HayatClassId; lessonAr: string; lessonEn: string };
export type HayatQ = Base & (
  | { kind: 'choice'; promptAr: string; promptEn?: string; options: string[]; correct: number; explainAr: string; explainEn?: string }
  | { kind: 'vocab'; dir: 'toAr' | 'toEn'; en: string; ar: string; options: string[]; correct: number }
  | { kind: 'hear'; say: string; ar: string; options: string[]; correct: number }
  | { kind: 'picture'; pic: HayatPic; options: string[]; correct: number; ar: string }
  | { kind: 'listen'; say: string; ar: string; options: HayatPic[]; correct: number }
  | { kind: 'tf'; en: string; shownAr: string; trueAr: string; truth: boolean }
  | { kind: 'gap'; masked: string; options: string[]; correct: number; en: string; ar: string }
  | { kind: 'order'; words: string[]; en: string; ar: string }
);

/** Stable pseudo-random numbers (same question bank every run → stable counts; sessions shuffle on top). */
const hash = (s: string) => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; return h; };
const pickN = <T,>(pool: T[], n: number, seed: string, ok: (x: T) => boolean): T[] => {
  const out: T[] = []; const len = pool.length; if (!len) return out;
  let h = hash(seed);
  for (let tries = 0; tries < len * 2 && out.length < n; tries++) { h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0; const x = pool[h % len]; if (ok(x) && !out.includes(x)) out.push(x); }
  return out;
};
const insertAt = <T,>(others: T[], right: T, seed: string) => { const at = hash(seed) % (others.length + 1); const o = [...others]; o.splice(at, 0, right); return { options: o, correct: at }; };
export const firstSentence = (s: string) => { const m = s.split(/(?<=[.!؟?])\s/)[0] || s; return m.length > 150 ? m.slice(0, 147) + '…' : m; };
const words = (en: string) => en.trim().split(/\s+/).filter(Boolean);
/** Plain English line (no dialogue labels, arrows, slashes or IPA). */
const isPlain = (en: string) => /^[A-Za-z0-9 ,.'’?!-]+$/.test(en) && words(en).length >= 1 && words(en).length <= 14;
const isSentence = (en: string) => isPlain(en) && words(en).length >= 3 && words(en).length <= 9;
/** A single English word / short phrase with a short Arabic meaning (vocabulary item). */
const isWord = (en: string, ar: string) => /^[A-Za-z][A-Za-z' -]*$/.test(en.trim()) && words(en).length <= 2 && en.trim().length >= 2 && !/[A-Za-z0-9]/.test(ar) && ar.trim().split(/\s+/).length <= 3 && ar.length <= 24;
const core = (w: string) => w.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '');

export type Src = { cls: HayatClassId; lesson: SaraTrackLesson & Partial<TutorLesson> };
export function hayatSources(): Src[] {
  const out: Src[] = [];
  for (const t of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK]) for (const l of t.lessons) if (l.content) out.push({ cls: 'sara', lesson: l });
  for (const t of TUTOR_TRACKS) for (const l of t.lessons) if (l.content && !l.soon) out.push({ cls: t.personaId as HayatClassId, lesson: l });
  return out;
}

type NoEn = HayatQ extends infer U ? U extends HayatQ ? Omit<U, 'lessonEn'> : never : never;
function build(): HayatQ[] {
  const qs: HayatQ[] = [];
  const seen = new Set<string>();
  let curEn = '';
  const add = (q0: NoEn, key: string) => { const q = { ...q0, lessonEn: curEn } as HayatQ; const k = `${q.cls}|${q.kind}|${key}`; if (seen.has(k)) return; seen.add(k); qs.push(q); };
  const src = hayatSources();
  // Pools per class (decoys come from the same class so the level matches).
  const sentPool = new Map<string, { en: string; ar: string }[]>();
  const wordPool = new Map<string, string[]>();
  // Decoys come from the same track/level (e.g. «adv-c1», «foundations», «reem») so an A1 sentence never sits next to C1 words.
  const grp = (cls: HayatClassId, lid: string) => `${cls}|${lid.replace(/-\d+$/, '')}`;
  const push = <T,>(m: Map<string, T[]>, c: string, v: T) => { const a = m.get(c) || []; a.push(v); m.set(c, a); };
  for (const { cls, lesson } of src) for (const e of lesson.content!.example) if (e?.en && e?.ar) {
    push(sentPool, grp(cls, lesson.id), e);
    for (const w of words(e.en)) { const c = core(w); if (/^[A-Za-z']{3,}$/.test(c)) push(wordPool, grp(cls, lesson.id), c); }
  }
  for (const [c, a] of wordPool) wordPool.set(c, [...new Set(a)]);
  // Sara's vocabulary track: 10 words per topic, each with an example sentence.
  const vocabLessons = VOCAB_LESSONS;

  for (const { cls, lesson } of src) {
    const c = lesson.content!; const lessonAr = lesson.titleAr; const lid = lesson.id; curEn = lesson.titleEn;
    // 1) the lesson's own questions (check + exercises), kept exactly as written.
    [c.check, ...c.exercises].forEach((raw, i) => {
      const q: SaraChoiceQuestion = normalizeChoice(raw);
      if (choiceProblems(q).length) return;
      const right = q.options[q.correctIndex];
      const linaP = /^«(.+)» بالإنجليزي:?$/.exec(q.promptAr.trim());
      const pEn = q.promptEn || (linaP ? `How do you say «${linaP[1]}» in English?` : undefined);
      add({ id: `${lid}-c${i}`, cls, lessonAr, kind: 'choice', promptAr: q.promptAr, ...(pEn ? { promptEn: pEn } : {}), options: q.options, correct: q.correctIndex,
        explainAr: `الجواب الصحيح: «${right}». ${firstSentence(c.explanationAr)}` }, `${q.promptAr}|${q.promptEn || ''}|${q.options.join('/')}`);
    });
    // 2) examples → true/false, fill the gap, word order.
    const pool = sentPool.get(grp(cls, lid)) || [];
    c.example.forEach((e, i) => {
      if (!e?.en || !e?.ar) return;
      if (!isPlain(e.en)) return;
      const truth = hash(`${lid}tf${i}`) % 2 === 0;
      // A wrong meaning from the same lesson first (close enough to make you think), else from the same class.
      const other = truth ? null : (c.example.find((x, j) => j !== i && x?.ar && x.ar !== e.ar && x.en !== e.en && isPlain(x.en)) || pickN(pool, 1, `${lid}tfo${i}`, x => x.ar !== e.ar && x.en !== e.en)[0]);
      if (truth || other) add({ id: `${lid}-t${i}`, cls, lessonAr, kind: 'tf', en: e.en, shownAr: truth ? e.ar : other!.ar, trueAr: e.ar, truth: truth || !other }, e.en);
      if (isSentence(e.en)) {
        const ws = words(e.en);
        const cand = ws.map((w, k) => ({ k, w: core(w) })).filter(x => /^[A-Za-z']{3,}$/.test(x.w)).sort((a, b) => b.w.length - a.w.length || a.k - b.k)[0];
        if (cand) {
          const lower = new Set(ws.map(w => core(w).toLowerCase()));
          const decoys = pickN(wordPool.get(grp(cls, lid)) || [], 2, `${lid}g${i}`, w => !lower.has(w.toLowerCase()) && Math.abs(w.length - cand.w.length) <= 4 && /^[a-z]/.test(w) === /^[a-z]/.test(cand.w));
          if (decoys.length === 2) {
            const masked = ws.map((w, k) => k === cand.k ? w.replace(cand.w, '___') : w).join(' ');
            const { options, correct } = insertAt(decoys, cand.w, `${lid}gi${i}`);
            add({ id: `${lid}-g${i}`, cls, lessonAr, kind: 'gap', masked, options, correct, en: e.en, ar: e.ar }, e.en);
          }
        }
        if (new Set(ws).size >= 3) add({ id: `${lid}-o${i}`, cls, lessonAr, kind: 'order', words: ws, en: e.en, ar: e.ar }, e.en);
      }
    });
    // 2b) English-first questions: word meaning (both ways) and «اسمع واقرأ» (hear an English sentence, pick it in writing).
    c.example.forEach((e, i) => {
      if (!e?.en || !e?.ar) return;
      if (isWord(e.en, e.ar)) {
        const arPool = [...new Set(pool.filter(x => isWord(x.en, x.ar)).map(x => x.ar))].filter(a => a !== e.ar);
        const enPool = [...new Set(pool.filter(x => isWord(x.en, x.ar)).map(x => x.en.toLowerCase()))].filter(w => w !== e.en.toLowerCase());
        const da = pickN(arPool, 2, `${lid}va${i}`, () => true); const de = pickN(enPool, 2, `${lid}ve${i}`, () => true);
        if (da.length === 2) { const o = insertAt(da, e.ar, `${lid}vai${i}`); add({ id: `${lid}-v${i}`, cls, lessonAr, kind: 'vocab', dir: 'toAr', en: e.en, ar: e.ar, options: o.options, correct: o.correct }, `${e.en}>ar`); }
        if (de.length === 2) { const o = insertAt(de, e.en.toLowerCase(), `${lid}vei${i}`); add({ id: `${lid}-w${i}`, cls, lessonAr, kind: 'vocab', dir: 'toEn', en: e.en, ar: e.ar, options: o.options, correct: o.correct }, `${e.ar}>en`); }
      } else if (isSentence(e.en) && !/[?]/.test(e.ar.slice(0, 0))) {
        const same = pool.filter(x => x.en !== e.en && isSentence(x.en) && Math.abs(words(x.en).length - words(e.en).length) <= 3);
        const d = pickN(same, 2, `${lid}h${i}`, x => x.en.toLowerCase() !== e.en.toLowerCase());
        if (d.length === 2) { const o = insertAt(d.map(x => x.en), e.en, `${lid}hi${i}`); add({ id: `${lid}-h${i}`, cls, lessonAr, kind: 'hear', say: e.en, ar: e.ar, options: o.options, correct: o.correct }, e.en); }
      }
    });
    // 3) pictures: Lina's illustrations and the kids' emoji cards → picture-to-sentence and listen-and-choose.
    if (lesson.pics) {
      const sc = lesson.pics.scenes;
      sc.forEach((s, i) => {
        const others = sc.filter((_, j) => j !== i);
        const o = insertAt(pickN(others, 2, `${lid}p${i}`, x => x.en !== s.en).map(x => x.en), s.en, `${lid}pi${i}`);
        add({ id: `${lid}-p${i}`, cls, lessonAr, kind: 'picture', pic: { img: s.img }, options: o.options, correct: o.correct, ar: s.ar }, s.img);
      });
      const L = lesson.pics.listen;
      if (L) { const s = sc[L.scene]; const o = insertAt(L.decoys.slice(0, 2).map(d => ({ img: d.img })), { img: s.img }, `${lid}l`); add({ id: `${lid}-l`, cls, lessonAr, kind: 'listen', say: s.en, ar: s.ar, options: o.options, correct: o.correct }, s.en); }
    }
    if (lesson.kids?.cards?.length) cards(cls, lid, lessonAr, lesson.kids.cards, add);
  }
  // Sara's vocabulary topics: word meaning (both ways), picture cards, fill the gap in the example sentence, hear-and-read.
  for (const vl of vocabLessons) {
    const lid = `vocab-${vl.id}`; const lessonAr = vl.titleAr; curEn = vl.titleEn;
    const lvl = vocabLessons.filter(x => x.levelId === vl.levelId).flatMap(x => x.words);
    vl.words.forEach((w, i) => {
      if (!w.en || !w.ar) return;
      const da = pickN(lvl.filter(x => x.ar !== w.ar), 2, `${lid}va${i}`, () => true).map(x => x.ar);
      const de = pickN(lvl.filter(x => x.en !== w.en), 2, `${lid}ve${i}`, () => true).map(x => x.en);
      if (da.length === 2) { const o = insertAt(da, w.ar, `${lid}vai${i}`); add({ id: `${lid}-v${i}`, cls: 'sara', lessonAr, kind: 'vocab', dir: 'toAr', en: w.en, ar: w.ar, options: o.options, correct: o.correct }, `${w.en}>ar`); }
      if (de.length === 2) { const o = insertAt(de, w.en, `${lid}vei${i}`); add({ id: `${lid}-w${i}`, cls: 'sara', lessonAr, kind: 'vocab', dir: 'toEn', en: w.en, ar: w.ar, options: o.options, correct: o.correct }, `${w.ar}>en`); }
      const ex = w.example || ''; const exWords = words(ex);
      if (isSentence(ex) && ex.toLowerCase().includes(w.en.toLowerCase()) && !/\s/.test(w.en.trim())) {
        const re = new RegExp(`\\b${w.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        const m = re.exec(ex);
        if (m) { const dg = pickN(lvl.filter(x => x.en !== w.en && !/\s/.test(x.en)), 2, `${lid}g${i}`, x => x.en.toLowerCase() !== w.en.toLowerCase()).map(x => x.en);
          if (dg.length === 2) { const o = insertAt(dg, m[0], `${lid}gi${i}`); add({ id: `${lid}-g${i}`, cls: 'sara', lessonAr, kind: 'gap', masked: ex.replace(re, '___'), options: o.options, correct: o.correct, en: ex, ar: `${w.en} = ${w.ar}` }, ex); } }
        void exWords;
      }
    });
    cards('sara', lid, lessonAr, vl.words.map(w => ({ en: w.en, ar: w.ar, emoji: w.emoji })), add);
  }
  // Abboud's classroom (cartoon avatar only; lesson words + examples).
  for (const l of SESSIONS_CONFIG) {
    const lid = `abboud-${l.id}`; const lessonAr = l.titleAr; curEn = l.titleEn;
    cards('abboud', lid, lessonAr, l.words, add);
    l.words.forEach((w, i) => { if (isWord(w.en, w.ar)) { const pl = l.words.filter(x => x.en !== w.en && isWord(x.en, x.ar)); if (pl.length >= 2) { const o = insertAt(pl.slice(0, 2).map(x => x.ar), w.ar, `${lid}vw${i}`); add({ id: `${lid}-v${i}`, cls: 'abboud', lessonAr, kind: 'vocab', dir: 'toAr', en: w.en, ar: w.ar, options: o.options, correct: o.correct }, `${w.en}>ar`); } } });
    l.examples.forEach((e, i) => {
      const truth = hash(`${lid}tf${i}`) % 2 === 0;
      const other = l.examples.find(x => x.ar !== e.ar) || SESSIONS_CONFIG[(l.id % SESSIONS_CONFIG.length)].examples[0];
      add({ id: `${lid}-t${i}`, cls: 'abboud', lessonAr, kind: 'tf', en: e.en, shownAr: truth ? e.ar : other.ar, trueAr: e.ar, truth: truth || other.ar === e.ar }, e.en);
      if (isSentence(e.en) && new Set(words(e.en)).size >= 3) add({ id: `${lid}-o${i}`, cls: 'abboud', lessonAr, kind: 'order', words: words(e.en), en: e.en, ar: e.ar }, e.en);
    });
  }
  return qs;
}

function cards(cls: HayatClassId, lid: string, lessonAr: string, list: { en: string; ar: string; emoji: string }[], add: (q: NoEn, key: string) => void) {
  const cs = list.filter(c => c.emoji && c.en);
  if (cs.length < 3) return;
  cs.forEach((card, i) => {
    const others = pickN(cs, 2, `${lid}k${i}`, x => x.en !== card.en && x.emoji !== card.emoji);
    if (others.length < 2) return;
    const p = insertAt(others.map(x => x.en), card.en, `${lid}ki${i}`);
    add({ id: `${lid}-k${i}`, cls, lessonAr, kind: 'picture', pic: { emoji: card.emoji }, options: p.options, correct: p.correct, ar: card.ar }, `${card.emoji}|${card.en}`);
    const l = insertAt(others.map(x => ({ emoji: x.emoji })), { emoji: card.emoji }, `${lid}kl${i}`);
    add({ id: `${lid}-kl${i}`, cls, lessonAr, kind: 'listen', say: card.en, ar: card.ar, options: l.options, correct: l.correct }, card.en);
  });
}

let bank: HayatQ[] | null = null;
export const hayatBank = (): HayatQ[] => (bank ||= build());

export type HayatMode = 'mixed' | 'challenge' | 'picture' | 'listen' | 'tf' | 'order' | 'vocab' | 'hear';
/** «اللغة»: 'all' = Arabic helper text + English (as before, now with English stems too); 'en' = English-only wording, Arabic only as small help. */
export type HayatLang = 'all' | 'en';
export const MODE_KINDS: Record<HayatMode, HayatKind[]> = {
  mixed: ['picture', 'choice', 'tf', 'gap', 'listen', 'order', 'vocab', 'hear'],
  challenge: ['choice', 'picture', 'tf', 'gap', 'vocab', 'hear'],
  picture: ['picture'], listen: ['listen'], tf: ['tf'], order: ['order'], vocab: ['vocab'], hear: ['hear'],
};
export const SESSION_LEN = 10;
export const CHALLENGE_SECONDS = 60;

const hasAr = (x: string) => /[\u0600-\u06FF]/.test(x);
/** English-only wording: a lesson question needs an English stem (Lina's «How do you say «…» in English?» keeps the Arabic phrase on purpose); every other kind is an English word/sentence with only small Arabic help. */
export const englishReady = (q: HayatQ) => q.kind !== 'choice' || (!!q.promptEn && (!hasAr(q.promptEn) || q.cls === 'lina'));
const allowed = (q: HayatQ, classes: HayatClassId[], kinds: HayatKind[], lang: HayatLang) => classes.includes(q.cls) && kinds.includes(q.kind) && (lang === 'all' || englishReady(q));
export const countFor = (classes: HayatClassId[], kinds: HayatKind[], lang: HayatLang = 'all') => hayatBank().filter(q => allowed(q, classes, kinds, lang)).length;

/**
 * English stems and English explanations for the lesson questions: a small static file (public/hayat/en-prompts.json, built from the
 * site's own Arabic→English table by scripts/build-hayat-english.ts) loaded only when a round starts. If it can't load, rounds still work.
 */
let enLoad: Promise<void> | null = null;
export const loadHayatEnglish = (): Promise<void> => (enLoad ||= (async () => {
  try {
    const r = await fetch('/hayat/en-prompts.json'); if (!r.ok) return;
    const j = await r.json() as { p: Record<string, string>; x: Record<string, string> };
    for (const q of hayatBank()) if (q.kind === 'choice') {
      if (!q.promptEn && j.p[q.promptAr]) q.promptEn = j.p[q.promptAr];
      const lid = q.id.replace(/-c\d+$/, ''); if (j.x[lid]) q.explainEn = j.x[lid];
    }
  } catch { enLoad = null; }
})());

/** A session: kinds take turns, and every turn draws a class first so a big class (Sara) never crowds out the small ones in «الجميع». */
export function buildSession(classes: HayatClassId[], mode: HayatMode, rnd: () => number = Math.random, n = mode === 'challenge' ? 40 : SESSION_LEN, lang: HayatLang = 'all'): HayatQ[] {
  const kinds = MODE_KINDS[mode];
  const byKC = new Map<string, HayatQ[]>();
  for (const q of hayatBank()) if (allowed(q, classes, kinds, lang)) { const k = `${q.kind}|${q.cls}`; const a = byKC.get(k) || []; a.push(q); byKC.set(k, a); }
  const out: HayatQ[] = []; const used = new Set<string>();
  const ks = [...kinds].sort(() => rnd() - 0.5);
  for (let turn = 0, miss = 0; out.length < n && miss < kinds.length * 3; turn++) {
    const kind = ks[turn % ks.length];
    const cls = classes.filter(c => (byKC.get(`${kind}|${c}`) || []).some(q => !used.has(q.id)));
    if (!cls.length) { miss++; continue; }
    const c = cls[Math.floor(rnd() * cls.length)];
    const pool = byKC.get(`${kind}|${c}`)!.filter(q => !used.has(q.id));
    const q = pool[Math.floor(rnd() * pool.length)];
    used.add(q.id); out.push(q); miss = 0;
  }
  return out;
}

/** Hayat's own scoreboard: localStorage only, never Firestore, never XP. */
export const HAYAT_BEST_KEY = 'hayat_best_v1';
export type HayatBest = Partial<Record<HayatMode, number>>;
export const readHayatBest = (): HayatBest => { try { return JSON.parse(localStorage.getItem(HAYAT_BEST_KEY) || '{}') as HayatBest; } catch { return {}; } };
export const saveHayatBest = (mode: HayatMode, score: number): boolean => {
  const b = readHayatBest(); if ((b[mode] ?? -1) >= score) return false;
  try { localStorage.setItem(HAYAT_BEST_KEY, JSON.stringify({ ...b, [mode]: score })); } catch { /* private mode: keep playing */ }
  return true;
};
