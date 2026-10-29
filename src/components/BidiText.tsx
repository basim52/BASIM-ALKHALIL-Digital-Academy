import React from 'react';

/** Latin run inside Arabic text: starts at a letter/blank, may hold spaces, punctuation and ___ blanks. */
const RUN = /[A-Za-z_][A-Za-z0-9_'’ ,.;:?!\-–—/()"]*[A-Za-z0-9_.?!)"’]|[A-Za-z_]/g;
/** Split mixed Arabic+English into parts; English parts get their own LTR isolate so «the thief ___.» keeps the blank at the end. */
export const bidiParts = (s: string): { t: string; ltr: boolean }[] => {
  const out: { t: string; ltr: boolean }[] = []; let last = 0;
  for (const m of s.matchAll(RUN)) {
    if (m.index! > last) out.push({ t: s.slice(last, m.index), ltr: false });
    out.push({ t: m[0], ltr: true }); last = m.index! + m[0].length;
  }
  if (last < s.length) out.push({ t: s.slice(last), ltr: false });
  return out;
};
/** Arabic text with embedded English rendered correctly (each English run in <bdi dir="ltr">). Pure-English text is one LTR run. */
export const BidiText: React.FC<{ text: string }> = ({ text }) => {
  if (!/[\u0600-\u06FF]/.test(text)) return <>{text}</>;
  return <>{bidiParts(text).map((p, i) => p.ltr ? <bdi key={i} dir="ltr">{p.t}</bdi> : <React.Fragment key={i}>{p.t}</React.Fragment>)}</>;
};
