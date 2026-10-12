// Compact lesson context sent to /api/sara/chat so Sara teaches from the actual curriculum data.
export function buildSaraLessonContext(lesson: any) {
  if (!lesson) return undefined;
  const ctx: Record<string, unknown> = {
    id: lesson.id,
    pillarId: lesson.pillarId,
    courseLabelAr: lesson.courseLabelAr || lesson.pillarNameAr,
    courseLabelEn: lesson.courseLabelEn || lesson.pillarNameEn,
    titleAr: lesson.titleAr,
    titleEn: lesson.titleEn,
    level: lesson.cefr || lesson.levelCode || lesson.level,
    descriptionAr: lesson.descAr || lesson.descriptionAr,
    descriptionEn: lesson.descEn || lesson.descriptionEn,
  };
  if (lesson.keyPattern) ctx.rule = `${lesson.keyPattern.ruleEn} | ${lesson.keyPattern.formula}`;
  if (Array.isArray(lesson.objectivesEn)) ctx.objectives = lesson.objectivesEn.slice(0, 3);
  if (Array.isArray(lesson.vocabulary)) ctx.vocabulary = lesson.vocabulary.slice(0, 15).map((v: any) => `${v.word} = ${v.ar}`);
  if (Array.isArray(lesson.modelDialogue)) ctx.dialogue = lesson.modelDialogue.slice(0, 8).map((l: any) => `${l.speaker}: ${l.en}`);
  if (lesson.pronunciationFocus) ctx.pronunciation = `${lesson.pronunciationFocus.focus}: ${(lesson.pronunciationFocus.items || []).join(', ')}`;
  if (Array.isArray(lesson.arabicLearnerPitfalls)) ctx.pitfalls = lesson.arabicLearnerPitfalls.map((p: any) => `${p.incorrect} -> ${p.correct}`);
  if (Array.isArray(lesson.commonMistakes)) ctx.mistakes = lesson.commonMistakes.slice(0, 3).map((m: any) => `${m.incorrect} -> ${m.correct}`);
  if (lesson.speakingChallenge) ctx.speakingTask = lesson.speakingChallenge.saraQuestionEn;
  if (Array.isArray(lesson.reviewOfPrevious)) ctx.reviewFromLessons = Array.from(new Set(lesson.reviewOfPrevious.map((r: any) => r.fromLessonId)));
  if (lesson.masteryCheck) ctx.masteryPassScore = lesson.masteryCheck.passScore;
  return ctx;
}
