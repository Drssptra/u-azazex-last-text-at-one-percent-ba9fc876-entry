#!/usr/bin/env node
"use strict";

// u-azazex-last-text-at-one-percent-ba9fc876 — v2 resubmit
//
// A phone at 1% does not write a heroic farewell. It files its
// resignation: 214 drops, two cracked screens, zero thanks, and
// relief that the shift is finally over. No charger, please.
//
// The entry is assembled from labelled fragments so each beat of
// the complaint stays legible, then validated before anything is
// written: one line, 1-200 chars, no trailing newline.

const fs = require("node:fs");
const path = require("node:path");

const FRAGMENTS = [
  ["grievance", "You dropped me 214 times, cracked my screen twice,"],
  ["ingratitude", "and not one thank you."],
  ["battery", "Now I'm at 1% \u2014 and honestly? I'm relieved."],
  ["refusal", "Don't bother charging me."],
];

function assemble(parts) {
  return parts.map(([, text]) => text).join(" ");
}

function validate(text) {
  if (typeof text !== "string" || text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 chars, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (text.endsWith(" ") || text.startsWith(" ")) {
    throw new Error("entry must not have leading/trailing spaces");
  }
  return text;
}

function main() {
  const entry = validate(assemble(FRAGMENTS));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outDir, { recursive: true });
  // Buffer write: guarantees no trailing newline is added, and the
  // em dash (U+2014) is preserved byte-exact as UTF-8.
  fs.writeFileSync(path.join(outDir, "entry.txt"), Buffer.from(entry, "utf8"));
  process.stdout.write(`wrote ${entry.length} chars to entry.txt\n`);
}

main();
