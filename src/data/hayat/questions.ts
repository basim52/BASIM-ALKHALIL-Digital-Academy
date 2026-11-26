import type { SaraChoiceQuestion, SaraTrackLesson } from '../saraTracks/foundations';
import { FOUNDATIONS_TRACK } from '../saraTracks/foundations';
import { ADVANCED_TRACK } from '../saraTracks/advanced';
import { CONVERSATION_TRACK } from '../saraTracks/conversation';
import { READING_TRACK } from '../saraTracks/reading';
import { WRITING_TRACK } from '../saraTracks/writing';
import { TUTOR_TRACKS, type TutorLesson } from '../tutorTracks';
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

export type HayatKind = 'choice' | 'picture' | 'listen' | 'tf' | 'gap' | 'order';
/** A picture: a real lesson illustration (Lina) or a big emoji tile (card lessons, Abboud). */
export type HayatPic = { img?: string; emoji?: string };
type Base = { id: string; cls: HayatClassId; lessonAr: string };
export type HayatQ = Base & (
  | { kind: 'choice'; promptAr: string; promptEn?: string; options: string[]; correct: number; explainAr: string }
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
const firstSentence = (s: string) => { const m = s.split(/(?<=[.!؟?])\s/)[0] || s; return m.length > 150 ? m.slice(0, 147) + '…' : m; };
const words = (en: string) => en.trim().split(/\s+/).filter(Boolean);
/** Plain English line (no dialogue labels, arrows, slashes or IPA). */
const isPlain = (en: string) => /^[A-Za-z0-9 ,.'’?!-]+$/.test(en) && words(en).length >= 1 && words(en).length <= 14;
const isSentence = (en: string) => isPlain(en) && words(en).length >= 3 && words(en).length <= 9;
const core = (w: string) => w.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, '');

type Src = { cls: HayatClassId; lesson: SaraTrackLesson & Partial<TutorLesson> };
function sources(): Src[] {
  const out: Src[] = [];
  for (const t of [FOUNDATIONS_TRACK, ADVANCED_TRACK, CONVERSATION_TRACK, READING_TRACK, WRITING_TRACK]) for (const l of t.lessons) if (l.content) out.push({ cls: 'sara', lesson: l });
  for (const t of TUTOR_TRACKS) for (const l of t.lessons) if (l.content && !l.soon) out.push({ cls: t.personaId as HayatClassId, lesson: l });
  return out;
}

function build(): HayatQ[] {
  const qs: HayatQ[] = [];
  const seen = new Set<string>();
  const add = (q: HayatQ, key: string) => { const k = `${q.cls}|${q.kind}|${key}`; if (seen.has(k)) return; seen.add(k); qs.push(q); };
  const src = sources();
  // Pools per class (decoys come from the same class so the level matches).
  const sentPool = new Map<HayatClassId, { en: string; ar: string }[]>();
  const wordPool = new Map<HayatClassId, string[]>();
  const push = <T,>(m: Map<HayatClassId, T[]>, c: HayatClassId, v: T) => { const a = m.get(c) || []; a.push(v); m.set(c, a); };
  for (const { cls, lesson } of src) for (const e of lesson.content!.example) if (e?.en && e?.ar) {
    push(sentPool, cls, e);
    for (const w of words(e.en)) { const c = core(w); if (/^[A-Za-z']{3,}$/.test(c)) push(wordPool, cls, c); }
  }
  for (const [c, a] of wordPool) wordPool.set(c, [...new Set(a)]);

  for (const { cls, lesson } of src) {
    const c = lesson.content!; const lessonAr = lesson.titleAr; const lid = lesson.id;
    // 1) the lesson's own questions (check + exercises), kept exactly as written.
    [c.check, ...c.exercises].forEach((raw, i) => {
      const q: SaraChoiceQuestion = normalizeChoice(raw);
      if (choiceProblems(q).length) return;
      const right = q.options[q.correctIndex];
      add({ id: `${lid}-c${i}`, cls, lessonAr, kind: 'choice', promptAr: q.promptAr, ...(q.promptEn ? { promptEn: q.promptEn } : {}), options: q.options, correct: q.correctIndex,
        explainAr: `الجواب الصحيح: «${right}». ${firstSentence(c.explanationAr)}` }, `${q.promptAr}|${q.promptEn || ''}|${q.options.join('/')}`);
    });
    // 2) examples → true/false, fill the gap, word order.
    const pool = sentPool.get(cls) || [];
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
          const decoys = pickN(wordPool.get(cls) || [], 2, `${lid}g${i}`, w => !lower.has(w.toLowerCase()) && Math.abs(w.length - cand.w.length) <= 4 && /^[a-z]/.test(w) === /^[a-z]/.test(cand.w));
          if (decoys.length === 2) {
            const masked = ws.map((w, k) => k === cand.k ? w.replace(cand.w, '___') : w).join(' ');
            const { options, correct } = insertAt(decoys, cand.w, `${lid}gi${i}`);
            add({ id: `${lid}-g${i}`, cls, lessonAr, kind: 'gap', masked, options, correct, en: e.en, ar: e.ar }, e.en);
          }
        }
        if (new Set(ws).size >= 3) add({ id: `${lid}-o${i}`, cls, lessonAr, kind: 'order', words: ws, en: e.en, ar: e.ar }, e.en);
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
  // Abboud's classroom (cartoon avatar only; lesson words + examples).
  for (const l of SESSIONS_CONFIG) {
    const lid = `abboud-${l.id}`; const lessonAr = l.titleAr;
    cards('abboud', lid, lessonAr, l.words, add);
    l.examples.forEach((e, i) => {
      const truth = hash(`${lid}tf${i}`) % 2 === 0;
      const other = l.examples.find(x => x.ar !== e.ar) || SESSIONS_CONFIG[(l.id % SESSIONS_CONFIG.length)].examples[0];
      add({ id: `${lid}-t${i}`, cls: 'abboud', lessonAr, kind: 'tf', en: e.en, shownAr: truth ? e.ar : other.ar, trueAr: e.ar, truth: truth || other.ar === e.ar }, e.en);
      if (isSentence(e.en) && new Set(words(e.en)).size >= 3) add({ id: `${lid}-o${i}`, cls: 'abboud', lessonAr, kind: 'order', words: words(e.en), en: e.en, ar: e.ar }, e.en);
    });
  }
  return qs;
}

function cards(cls: HayatClassId, lid: string, lessonAr: string, list: { en: string; ar: string; emoji: string }[], add: (q: HayatQ, key: string) => void) {
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

export type HayatMode = 'mixed' | 'challenge' | 'picture' | 'listen' | 'tf' | 'order';
export const MODE_KINDS: Record<HayatMode, HayatKind[]> = {
  mixed: ['picture', 'choice', 'tf', 'gap', 'listen', 'order'],
  challenge: ['choice', 'picture', 'tf', 'gap'],
  picture: ['picture'], listen: ['listen'], tf: ['tf'], order: ['order'],
};
export const SESSION_LEN = 10;
export const CHALLENGE_SECONDS = 60;

export const countFor = (classes: HayatClassId[], kinds: HayatKind[]) => hayatBank().filter(q => classes.includes(q.cls) && kinds.includes(q.kind)).length;

/** A session: kinds take turns, and every turn draws a class first so a big class (Sara) never crowds out the small ones in «الجميع». */
export function buildSession(classes: HayatClassId[], mode: HayatMode, rnd: () => number = Math.random, n = mode === 'challenge' ? 40 : SESSION_LEN): HayatQ[] {
  const kinds = MODE_KINDS[mode];
  const byKC = new Map<string, HayatQ[]>();
  for (const q of hayatBank()) if (classes.includes(q.cls) && kinds.includes(q.kind)) { const k = `${q.kind}|${q.cls}`; const a = byKC.get(k) || []; a.push(q); byKC.set(k, a); }
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
