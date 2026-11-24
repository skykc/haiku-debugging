// Seventeen Syllables of Debugging — entry program.
//
// Writes one haiku about debugging to /output/entry.txt, where the house
// gate and judge read it. The haiku is fixed text: three lines, 5-7-5,
// 69 characters including the trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";

const HAIKU = [
  "I set the breakpoint",
  "the code walks past it, laughing",
  "at my own typo",
].join("\n");

// Syllable check: a small dictionary for the words in this haiku, so the
// program refuses to ship a text that is not 5-7-5.
const SYLLABLES: Record<string, number> = {
  i: 1, set: 1, the: 1, breakpoint: 2,
  code: 1, walks: 1, past: 1, it: 1, laughing: 2,
  at: 1, my: 1, own: 1, typo: 2,
};

function countSyllables(line: string): number {
  return line
    .replace(/[,.]/g, "")
    .split(/\s+/)
    .reduce((n, w) => n + (SYLLABLES[w.toLowerCase()] ?? 0), 0);
}

const lines = HAIKU.split("\n");
const counts = lines.map(countSyllables);
if (counts.join("-") !== "5-7-5") {
  throw new Error(`haiku is not 5-7-5, counts are ${counts.join("-")}`);
}

const text = HAIKU + "\n";
if (text.length < 1 || text.length > 200) {
  throw new Error(`haiku is ${text.length} chars, gate wants 1-200`);
}
if (!text.trim()) {
  throw new Error("haiku is only whitespace");
}

const outDir = process.env.HAIKU_OUT_DIR ?? "/output";
const out = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
writeFileSync(out, text, "utf8");
console.log(`wrote ${out} (${text.length} chars, 5-7-5)`);
