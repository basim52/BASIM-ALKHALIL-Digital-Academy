import type { SaraCurriculumLesson } from '../data/saraExclusiveCurriculums';
import type { SaraBoardPageSection } from '../types';
import { boardLinesToSpeech } from './boardToSpeech';

const arr = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);
const clip = (s: string | undefined, n = 220) => {
  const t = (s || '').trim();
  return t.length > n ? `${t.slice(0, n - 1)}…` : t;
};

/** Stable key identifying a lesson board (track + lesson id + language). */
export function buildLessonBoardKey(lesson: { pillarId?: string; id?: string | number }, lang: 'ar' | 'en'): string {
  return `${lesson.pillarId || 'lesson'}:${String(lesson.id ?? '')}:${lang}`;
}

/**
 * Builds Sara's whiteboard narration for every page from THIS lesson's own data
 * (objectives, grammarFocus, vocabulary, modelDialogue, pitfalls, exercises, mastery).
 * Falls back to older lesson fields so every lesson still gets distinct text.
 */
export function buildLessonPageBoardText(
  lesson: SaraCurriculumLesson,
  lang: 'ar' | 'en'
): Partial<Record<SaraBoardPageSection, string>> {
  const isRtl = lang === 'ar';
  const title = isRtl ? lesson.titleAr : lesson.titleEn;
  const level = lesson.cefr ? `${lesson.cefr}${lesson.unit ? ` · Unit ${lesson.unit}` : ''}` : lesson.level;
  const objectives = arr(isRtl ? lesson.objectivesAr : lesson.objectivesEn).slice(0, 3).map(o => String(o).trim().replace(/[.。]+$/, ''));
  const gf = lesson.grammarFocus;
  const formula = gf?.formula || lesson.keyPattern?.formula || '';
  const examples = arr(gf?.examples).length ? arr(gf?.examples) : arr(lesson.practicalExamples);
  const model = examples[0]?.en || '';
  const vocab = arr(lesson.vocabulary).slice(0, 6);
  const dialogue = arr(lesson.modelDialogue).slice(0, 2);
  const pitfall = arr(lesson.arabicLearnerPitfalls)[0] || arr(lesson.commonMistakes)[0];
  const pron = lesson.pronunciationFocus;
  const ex = lesson.exercises;
  const exCount = ex ? arr(ex.easy).length + arr(ex.medium).length + arr(ex.hard).length : 0;
  const mastery = lesson.masteryCheck;
  const qCount = arr(mastery?.questions).length || arr(lesson.quiz).length;
  const speak = lesson.speakingChallenge;

  const out: Partial<Record<SaraBoardPageSection, string>> = {};

  out.objective = isRtl
    ? `درسنا اليوم: «${title}» (${level}). ${objectives.length ? `في نهاية الدرس ستقدر: ${objectives.join('، و')}.` : `هدفنا: ${lesson.speakingGoalAr}.`} ${model ? `جملتنا النموذجية: "${model}"` : ''}`
    : `Today's lesson: "${title}" (${level}). ${objectives.length ? `By the end you will: ${objectives.join('; ')}.` : `Our goal: ${lesson.speakingGoalEn}.`} ${model ? `Our model sentence: "${model}"` : ''}`;

  out.formula = isRtl
    ? `القاعدة: ${clip(gf?.ruleAr || lesson.keyPattern?.ruleAr || lesson.speakingGoalAr)} ${formula ? `والصيغة على السبورة: ${formula}` : ''}`
    : `The rule: ${clip(gf?.ruleEn || lesson.keyPattern?.ruleEn || lesson.speakingGoalEn)} ${formula ? `The pattern on the board: ${formula}` : ''}`;

  const exLines = examples.slice(1, 3).map(e => `"${e.en}"`).join(isRtl ? ' و' : ' and ');
  const dlg = dialogue.map(d => `${d.speaker}: "${d.en}"`).join(' ');
  out.rules = isRtl
    ? `${exLines ? `أمثلة من الدرس: ${exLines}.` : ''} ${dlg ? `ومن الحوار النموذجي: ${dlg}` : ''}`.trim()
    : `${exLines ? `Examples from this lesson: ${exLines}.` : ''} ${dlg ? `From the model dialogue: ${dlg}` : ''}`.trim();
  if (!out.rules) delete out.rules;

  if (pitfall || pron) {
    out.pitfalls = isRtl
      ? `${pitfall ? `انتبه: لا تقل "${pitfall.incorrect}"، بل "${pitfall.correct}". ${clip(pitfall.whyAr, 160)}` : ''} ${pron ? `وفي النطق ركّز على: ${pron.focus}. ${clip(pron.tipAr, 160)}` : ''}`.trim()
      : `${pitfall ? `Watch out: don't say "${pitfall.incorrect}", say "${pitfall.correct}".` : ''} ${pron ? `Pronunciation focus: ${pron.focus}${arr(pron.items)[0] ? `, for example ${arr(pron.items)[0]}` : ''}.` : ''}`.trim();
  }

  out.exercises = isRtl
    ? `وقت التطبيق على «${title}»! ${exCount ? `عندك ${exCount} تمارين بثلاث مستويات: سهل ومتوسط وصعب.` : ''} ${speak ? `التحدي: ${speak.promptAr}` : ''}`
    : `Practice time for "${title}"! ${exCount ? `You have ${exCount} exercises in three levels: easy, medium and hard.` : ''} ${speak ? `Your challenge: ${speak.promptEn}` : ''}`;

  const words = vocab.map(v => (isRtl ? `${v.word} (${v.ar})` : v.word)).join(isRtl ? '، ' : ', ');
  out.speaking = isRtl
    ? `${words ? `كلمات الدرس: ${words}.` : ''} ${speak ? `تحدي التحدث: ${speak.promptAr}` : ''}`.trim()
    : `${words ? `This lesson's words: ${words}.` : ''} ${speak ? `Speaking challenge: ${speak.promptEn}` : ''}`.trim();
  if (!out.speaking) delete out.speaking;

  out.quiz = isRtl
    ? `اختبار إتقان «${title}»: ${qCount} أسئلة${mastery?.passScore ? `، والنجاح من ${mastery.passScore}` : ''}. ركّز وانطلق!`
    : `Mastery check for "${title}": ${qCount} questions${mastery?.passScore ? `, pass mark ${mastery.passScore}` : ''}. Focus and go!`;

  return out;
}

/** Board lines per page: one line per sentence, exactly what Sara writes AND says. */
export function buildLessonPageBoard(
  lesson: SaraCurriculumLesson,
  lang: 'ar' | 'en'
): Partial<Record<SaraBoardPageSection, string[]>> {
  const text = buildLessonPageBoardText(lesson, lang);
  const out: Partial<Record<SaraBoardPageSection, string[]>> = {};
  (Object.keys(text) as SaraBoardPageSection[]).forEach(k => {
    const lines = splitBoardLines(text[k] || '');
    if (lines.length) out[k] = lines;
  });
  return out;
}

export function splitBoardLines(t: string): string[] {
  return t.replace(/\s+/g, ' ').trim().split(/(?<=[.!?؟])\s+(?=[^\s"])/).map(x => x.trim()).filter(Boolean);
}

/** Speech is derived from the board lines, never written separately. */
export function buildLessonPageSpeech(
  lesson: SaraCurriculumLesson,
  lang: 'ar' | 'en'
): Partial<Record<SaraBoardPageSection, string>> {
  const board = buildLessonPageBoard(lesson, lang);
  const out: Partial<Record<SaraBoardPageSection, string>> = {};
  (Object.keys(board) as SaraBoardPageSection[]).forEach(k => { out[k] = boardLinesToSpeech(board[k]); });
  return out;
}
