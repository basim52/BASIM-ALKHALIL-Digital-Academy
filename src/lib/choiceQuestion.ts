import type { SaraChoiceQuestion } from '../data/saraTracks/foundations';

/** One option may arrive as a string or as an object ({en, ar} / {text} / {label}); always return display text. */
export const optionText = (o: unknown): string => {
  if (typeof o === 'string') return o;
  if (typeof o === 'number') return String(o);
  if (o && typeof o === 'object') { const r = o as Record<string, unknown>; return String(r.en ?? r.text ?? r.label ?? r.ar ?? r.value ?? ''); }
  return '';
};

/** Normalise any question shape the curriculum uses (promptAr/questionAr, string or object options) to what the UI renders. */
export function normalizeChoice(raw: unknown): SaraChoiceQuestion {
  const r = (raw || {}) as Record<string, unknown>;
  const options = Array.isArray(r.options) ? r.options.map(optionText) : [];
  const promptAr = String(r.promptAr ?? r.questionAr ?? r.question ?? '');
  const promptEn = (r.promptEn ?? r.questionEn) as string | undefined;
  const ci = typeof r.correctIndex === 'number' ? r.correctIndex : typeof r.answer === 'string' ? options.indexOf(r.answer) : -1;
  return { promptAr, ...(promptEn ? { promptEn } : {}), options, correctIndex: ci };
}

/** Problems a student would see: used by scripts/audit-questions.ts. */
export function choiceProblems(q: SaraChoiceQuestion): string[] {
  const p: string[] = [];
  if (!q.promptAr.trim() && !q.promptEn?.trim()) p.push('missing prompt');
  if (q.options.length < 2) p.push(`only ${q.options.length} options`);
  q.options.forEach((o, i) => { if (!o.trim()) p.push(`empty option ${i}`); });
  const lower = q.options.map(o => o.trim()); // case-sensitive: capitalisation and stress-mark options (HO-tel vs ho-TEL) are intentional
  if (new Set(lower).size !== lower.length) p.push('duplicate options');
  if (!(q.correctIndex >= 0 && q.correctIndex < q.options.length)) p.push(`correctIndex ${q.correctIndex} out of range`);
  return p;
}
