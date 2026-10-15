import { LISTENING_LESSONS, LISTENING_LESSONS as LISTENING_ALL, LISTENING_TRACK_ID } from '../data/saraTracks/listening';
import { PRONUNCIATION_LESSONS, PRONUNCIATION_LESSONS as PRON_ALL, PRONUNCIATION_TRACK_ID } from '../data/saraTracks/pronunciation';
import { VOCAB_LESSONS, VOCAB_LESSONS as VOCAB_ALL, VOCAB_TRACK_ID } from '../data/saraTracks/vocabulary';
import { DAILY_LESSONS, DAILY_LESSONS as DAILY_ALL, DAILY_TRACK_ID } from '../data/saraTracks/dailyLife';

/** One test item from a level's real lesson content. play = text Sara says (cloud voice) before answering. */
export interface NewTestItem { lessonId: string; lessonOrder: number; lessonTitleAr: string; promptAr: string; show?: string; play?: string; options: string[]; correctIndex: number }
export type NewTrackKey = 'listening' | 'pronunciation' | 'vocabulary' | 'daily';
export const NEW_TRACK_META: Record<NewTrackKey, { trackId: string; titleAr: string; levelId: string; levelTitleAr: string; total: number }> = {
  listening: { trackId: LISTENING_TRACK_ID, titleAr: 'الاستماع', levelId: 'a', levelTitleAr: 'المستوى الأول', total: 30 },
  pronunciation: { trackId: PRONUNCIATION_TRACK_ID, titleAr: 'النطق', levelId: 'a', levelTitleAr: 'المستوى الأول', total: 30 },
  vocabulary: { trackId: VOCAB_TRACK_ID, titleAr: 'المفردات', levelId: 'a', levelTitleAr: 'المستوى الأول', total: 30 },
  daily: { trackId: DAILY_TRACK_ID, titleAr: 'الحياة اليومية', levelId: 'a', levelTitleAr: 'المستوى الأول', total: 30 },
};
export const TEST_SIZE = 20;

const rnd = <T,>(a: T[]): T[] => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const mix = (correct: string, wrong: string[]) => { const options = rnd([correct, ...wrong.filter(w => w !== correct).slice(0, 2)]); return { options, correctIndex: options.indexOf(correct) }; };

export type NewLevelId = 'a' | 'b' | 'c' | 'd';
const LV_START: Record<NewLevelId, number> = { a: 1, b: 31, c: 61, d: 91 };
const inLevel = <T extends { order: number }>(a: T[], level: NewLevelId) => a.filter(l => l.order >= LV_START[level] && l.order < LV_START[level] + 30);
export const levelTitleAr = (level: NewLevelId) => ({ a: 'المستوى الأول', b: 'المستوى الثاني', c: 'المستوى الثالث', d: 'المستوى الرابع' })[level];

export function buildNewTrackTest(key: NewTrackKey, level: NewLevelId = 'a'): NewTestItem[] {
  const out: NewTestItem[] = [];
  const LISTENING_LESSONS = inLevel(LISTENING_ALL, level), PRONUNCIATION_LESSONS = inLevel(PRON_ALL, level), VOCAB_LESSONS = inLevel(VOCAB_ALL, level), DAILY_LESSONS = inLevel(DAILY_ALL, level);
  if (key === 'listening') {
    for (const l of rnd(LISTENING_LESSONS).slice(0, 10)) { // heard sentence
      const wrong = rnd(LISTENING_LESSONS.filter(x => x.id !== l.id)).map(x => x.dictation);
      out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: 'اسمع سارة: أي جملة قالت؟', play: l.dictation, ...mix(l.dictation, wrong) });
    }
    for (const l of rnd(LISTENING_LESSONS).slice(0, 10)) { // comprehension
      const q = l.questions[Math.floor(Math.random() * l.questions.length)];
      const c = q.options[q.correctIndex];
      out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: `اسمع الحوار ثم جاوب: ${q.questionAr}`, show: q.questionEn, play: l.audioText, ...mix(c, rnd(q.options.filter((_, i) => i !== q.correctIndex))) });
    }
  } else if (key === 'pronunciation') {
    const pool = PRONUNCIATION_LESSONS.flatMap(l => l.exercises.map(e => ({ l, e })));
    const perLesson = new Set<string>();
    for (const { l, e } of rnd(pool)) {
      if (out.length >= TEST_SIZE) break;
      if (perLesson.has(l.id) && out.length < PRONUNCIATION_LESSONS.length) continue; // spread across lessons first
      perLesson.add(l.id);
      const c = e.options[e.correctIndex];
      out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: e.promptAr, play: e.play, ...mix(c, rnd(e.options.filter((_, i) => i !== e.correctIndex))) });
    }
  } else if (key === 'vocabulary') {
    const all = VOCAB_LESSONS.flatMap(l => l.words.map(w => ({ l, w })));
    rnd(VOCAB_LESSONS).slice(0, TEST_SIZE).forEach((l, i) => {
      const w = l.words[Math.floor(Math.random() * l.words.length)];
      if (i % 2 === 0) out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: 'وش معنى الكلمة؟', show: w.en, play: w.en, ...mix(w.ar, rnd(all.filter(x => x.w.en !== w.en)).map(x => x.w.ar)) });
      else out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: 'أي كلمة تناسب الصورة؟', show: `${w.emoji} ${w.ar}`, ...mix(w.en, rnd(all.filter(x => x.w.en !== w.en)).map(x => x.w.en)) });
    });
  } else {
    const replies = DAILY_LESSONS.flatMap(l => l.dialogue.filter(d => d.sp === 'B').map(d => d.en));
    rnd(DAILY_LESSONS).slice(0, TEST_SIZE).forEach((l, i) => {
      if (i % 2 === 0) {
        const p = l.phrases[Math.floor(Math.random() * l.phrases.length)];
        const others = DAILY_LESSONS.flatMap(x => x.phrases).filter(x => x.en !== p.en).map(x => x.ar);
        out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: 'وش معنى العبارة؟', show: p.en, play: p.en, ...mix(p.ar, rnd(others)) });
      } else {
        const k = Math.random() < 0.5 ? 0 : 2; const a = l.dialogue[k], b = l.dialogue[k + 1];
        out.push({ lessonId: l.id, lessonOrder: l.order, lessonTitleAr: l.titleAr, promptAr: `${l.icon} ${l.titleAr}: سارة تقول، وش ردك المناسب؟`, show: a.en, play: a.en, ...mix(b.en, rnd(replies.filter(r => r !== b.en))) });
      }
    });
  }
  return rnd(out).slice(0, TEST_SIZE);
}
