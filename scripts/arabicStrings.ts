/** Every Arabic UI string literal in client code (src, excluding src/server), split at ${...} and newlines. */
import fs from "node:fs";
import path from "node:path";
const AR = /[\u0600-\u06FF]/;
const LIT = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
const CODE = /isRtl|activeLang|=>|\?\s*['"`]|[;=]\s*$|\(\s*['"`]|\.(map|replace|join|test)\(/;
const JSX = />([^<>{}]*[\u0600-\u06FF][^<>{}]*)</g;
export function arabicStrings(root = "src"): string[] {
  const out = new Set<string>();
  const walk = (d: string) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!p.includes(`${path.sep}server`)) walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(e.name)) continue;
    let s = fs.readFileSync(p, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    for (const m of s.matchAll(LIT)) {
      const v = (m[1] ?? m[2] ?? m[3] ?? "").replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n");
      for (const part of v.split(/\$\{[^}]*\}/)) for (const line of part.split("\n")) { const t = line.trim(); if (m[3] !== undefined && CODE.test(t)) continue; /* mis-paired backticks spanning JSX code */ if (AR.test(t)) out.add(t); }
    }
    for (const m of s.matchAll(JSX)) { const t = m[1].trim(); if (CODE.test(t)) continue; /* regex spanned code (e.g. `=> ... isRtl ? 'x' : 'y'`): its literals are already collected above */ if (AR.test(t)) out.add(t); }
  } };
  walk(root);
  return [...out].sort();
}
