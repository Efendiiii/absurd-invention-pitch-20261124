import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Meet the BlameShift Remote: a TV remote that, whenever you lose it down the sofa, loudly blames the cushions in a courtroom voice until they confess and spit it back out.";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 220
// characters, not only white space, and exactly one sentence.
if (ENTRY.length < 1 || ENTRY.length > 220) {
  throw new Error(`entry length ${ENTRY.length} outside 1-220`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
const sentences = ENTRY.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) {
  throw new Error(`expected exactly 1 sentence, got ${sentences.length}`);
}
if (ENTRY.includes("\n") || !ENTRY.endsWith(".")) {
  throw new Error("entry must be a single line ending with a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to /output/entry.txt`);
