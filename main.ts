const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

// The last text a dying phone sends at 1% battery, in its own voice:
// one final act of loyalty, one final bit of pride, then darkness.
const entry =
  "Battery at 1%. Deleting your browser history before I go. " +
  "You're welcome. Tell the charger I died a hero. Goodbye.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
