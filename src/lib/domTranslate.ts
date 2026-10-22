/**
 * Site-wide EN mode safety net: any Arabic text still rendered (text nodes + placeholder/title/aria-label/alt)
 * is replaced with English from public/i18n/en.json (built from every Arabic literal in the code).
 * Originals are kept and restored when switching back to Arabic. Skips inputs, contenteditable, the tldraw canvas
 * and anything under [data-no-i18n]. Arabic-Indic digits become Western digits.
 */
import { getExplainLang } from './explainLang';
const AR = /[\u0600-\u06FF]/;
const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];
let dict: Map<string, string> | null = null;
let loading: Promise<void> | null = null;
let observer: MutationObserver | null = null;
const origText = new WeakMap<Text, { orig: string; mine: string }>();
const origAttr = new Map<Element, Record<string, { orig: string; mine: string }>>();
const digits = (s: string) => s.replace(/[\u0660-\u0669]/g, d => String(d.charCodeAt(0) - 0x0660));

const load = () => (loading ??= fetch('/i18n/en.json').then(r => (r.ok ? r.json() : {})).catch(() => ({})).then((j: Record<string, string>) => {
  dict = new Map(Object.entries(j));
}));

// Perf: no giant alternation regex over ~43k keys. Exact lookup, then per-segment lookup, memoised.
const memo = new Map<string, string>();
const SEP = /(\n|\s[•|—–-]\s|[:：]\s|[«»"()])/;
const fix = (s: string) => digits(s).replace(/،/g, ',').replace(/؟/g, '?').replace(/؛/g, ';');
const seg = (p: string) => { const t = p.trim(); if (!t || !AR.test(t)) return p; const h = dict!.get(t); return h ? p.replace(t, h) : p; };
export const toEnglish = (s: string): string => {
  if (!AR.test(s) || !dict) return s;
  const m = memo.get(s); if (m !== undefined) return m;
  const t = s.trim();
  const hit = dict.get(t);
  const out = hit ? s.replace(t, hit) : fix(s.split(SEP).map(seg).join(''));
  if (memo.size > 20000) memo.clear();
  memo.set(s, out);
  return out;
};
const skip = (el: Element | null) => !!el?.closest('[data-no-i18n],input,textarea,[contenteditable="true"],.tl-container,script,style');

function doText(n: Text) {
  const v = n.nodeValue || '';
  if (!AR.test(v) || skip(n.parentElement)) return;
  const en = toEnglish(v);
  if (en !== v) { origText.set(n, { orig: v, mine: en }); n.nodeValue = en; }
}
function doEl(el: Element) {
  if (skip(el)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v && AR.test(v)) { const en = toEnglish(v); if (en !== v) { const rec = origAttr.get(el) || {}; rec[a] = { orig: v, mine: en }; origAttr.set(el, rec); el.setAttribute(a, en); } }
  }
}
function walk(root: Node) {
  if (root.nodeType === 3) { doText(root as Text); return; }
  if (root.nodeType !== 1) return;
  const el = root as Element; if (skip(el)) return;
  doEl(el);
  const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) n.nodeType === 3 ? doText(n as Text) : doEl(n as Element);
}
const pending = new Set<Node>(); let queued = false;
function flush() { queued = false; if (!observer) { pending.clear(); return; } const ns = [...pending]; pending.clear(); for (const n of ns) if (n.isConnected) walk(n); }
function start() {
  if (observer || !document.body) return;
  walk(document.body);
  if (AR.test(document.title)) document.title = toEnglish(document.title);
  observer = new MutationObserver(ms => { for (const m of ms) {
    if (m.type === 'characterData') doText(m.target as Text);
    else if (m.type === 'attributes') doEl(m.target as Element);
    else m.addedNodes.forEach(n => pending.add(n));
  } if (pending.size && !queued) { queued = true; queueMicrotask(flush); } });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}
function stop() {
  observer?.disconnect(); observer = null; pending.clear();
  // restore originals (only where React has not changed the text since)
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode() as Text | null; n; n = tw.nextNode() as Text | null) { const r = origText.get(n); if (r && n.nodeValue === r.mine) n.nodeValue = r.orig; }
  origAttr.forEach((rec, el) => { for (const [a, r] of Object.entries(rec)) if (el.getAttribute(a) === r.mine) el.setAttribute(a, r.orig); });
  origAttr.clear();
}
export function syncDomTranslation() {
  if (typeof document === 'undefined') return;
  if (getExplainLang() === 'en') void load().then(() => { if (getExplainLang() === 'en') start(); });
  else stop();
}
