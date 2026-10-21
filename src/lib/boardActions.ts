/** Structured board actions returned by /api/sara/board. Laid out top-to-bottom on a grid (no free x/y). */
export type BoardAction =
  | { kind: 'title'; text: string }
  | { kind: 'text'; text: string; ar?: string }
  | { kind: 'highlight'; text: string }
  | { kind: 'example'; en: string; ar?: string }
  | { kind: 'fix'; wrong: string; right: string }
  | { kind: 'arrow'; from: string; to: string };
export interface BoardCheck { q: string; options: string[]; correctIndex: number }
export interface BoardResult { boardActions: BoardAction[]; explanationAr: string; checks: BoardCheck[] }
const KINDS = ['title', 'text', 'highlight', 'example', 'fix', 'arrow'];
const s = (v: unknown, n = 160) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
export const MAX_ACTIONS = 6;
export function sanitizeBoard(raw: any): BoardResult | null {
  if (!raw || !Array.isArray(raw.boardActions)) return null;
  const boardActions: BoardAction[] = [];
  for (const a of raw.boardActions) {
    if (!a || !KINDS.includes(a.kind)) continue;
    const x: any = { kind: a.kind };
    if (a.kind === 'example') { x.en = s(a.en); if (a.ar) x.ar = s(a.ar); if (!x.en) continue; }
    else if (a.kind === 'fix') { x.wrong = s(a.wrong, 80); x.right = s(a.right, 80); if (!x.wrong || !x.right) continue; }
    else if (a.kind === 'arrow') { x.from = s(a.from, 60); x.to = s(a.to, 60); if (!x.from || !x.to) continue; }
    else { x.text = s(a.text, a.kind === 'title' ? 60 : 160); if (a.ar) x.ar = s(a.ar); if (!x.text) continue; }
    boardActions.push(x);
    if (boardActions.length >= MAX_ACTIONS) break;
  }
  const checks: BoardCheck[] = (Array.isArray(raw.checks) ? raw.checks : []).map((c: any) => ({
    q: s(c?.q, 160), options: (Array.isArray(c?.options) ? c.options : []).slice(0, 4).map((o: any) => s(o, 60)).filter(Boolean), correctIndex: Number(c?.correctIndex),
  })).filter((c: BoardCheck) => c.q && c.options.length >= 2 && Number.isInteger(c.correctIndex) && c.correctIndex >= 0 && c.correctIndex < c.options.length).slice(0, 3);
  if (!boardActions.length) return null;
  return { boardActions, explanationAr: s(raw.explanationAr, 300), checks };
}

/** Tutor-board tool calls (same vocabulary as ai-tutor-platform's whiteboard: drawBoardText, highlightError, addNote, drawArrow). */
export type BoardToolCall =
  | { tool: 'drawBoardText'; payload: { content: string; fontSize: 's' | 'm' | 'l' | 'xl'; color: 'yellow' | 'white' | 'light-blue' } }
  | { tool: 'addNote'; payload: { content: string; color: 'yellow' } }
  | { tool: 'highlightError'; payload: { incorrectSnippet: string; correctedSnippet: string } }
  | { tool: 'drawArrow'; payload: { from: string; to: string } };
export function toToolCalls(actions: BoardAction[]): BoardToolCall[] {
  return actions.map((a): BoardToolCall => {
    switch (a.kind) {
      case 'title': return { tool: 'drawBoardText', payload: { content: a.text, fontSize: 'l', color: 'yellow' } };
      case 'highlight': return { tool: 'addNote', payload: { content: a.text, color: 'yellow' } };
      case 'example': return { tool: 'drawBoardText', payload: { content: a.ar ? `✏️ ${a.en}\n${a.ar}` : `✏️ ${a.en}`, fontSize: 'm', color: 'white' } };
      case 'fix': return { tool: 'highlightError', payload: { incorrectSnippet: a.wrong, correctedSnippet: a.right } };
      case 'arrow': return { tool: 'drawArrow', payload: { from: a.from, to: a.to } };
      default: return { tool: 'drawBoardText', payload: { content: a.ar ? `${a.text}\n${a.ar}` : a.text, fontSize: 'm', color: 'light-blue' } };
    }
  });
}
