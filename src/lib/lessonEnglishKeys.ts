/** Shared by the client and the build-time pretranslation: which lesson texts get an English version, and their signature. */
type Q = { promptAr: string };
export const lessonTextsForEnglish = (l: { content?: { explanationAr: string; altExplanationAr: string; check: Q; exercises: Q[] } | null }): string[] => {
  const c = l.content!; return [c.explanationAr, c.altExplanationAr, c.check.promptAr, ...c.exercises.map(e => e.promptAr)];
};
export const lessonSig = (texts: string[]) => `${texts.join('\u0001').length}|${texts.length}`;
