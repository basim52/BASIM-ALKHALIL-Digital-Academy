/** Arabic audit for EN mode: every Arabic UI literal must have an English entry (public/i18n/en.json) or be a documented exception. */
import fs from "node:fs";
import { arabicStrings } from "./arabicStrings";
/** Justified exceptions: shown on purpose in EN mode. */
export const EXCEPTIONS = new Set<string>(["ع"]); // the Arabic side of the ع/EN toggle
const dict: Record<string, string> = JSON.parse(fs.readFileSync("public/i18n/en.json", "utf8") || "{}");
const all = arabicStrings();
const left = all.filter(s => !dict[s] && !EXCEPTIONS.has(s));
console.log(`Arabic UI strings: ${all.length}; translated: ${all.length - left.length}; exceptions: ${EXCEPTIONS.size}; remaining: ${left.length}`);
if (process.argv.includes("--list")) left.slice(0, 200).forEach(s => console.log("  ", s.slice(0, 120)));
process.exit(process.argv.includes("--strict") && left.length ? 1 : 0);
