// Make the AI Judge Laugh: AI Agent Confessions
// The confession is a fixed, hand-written line: deterministic output means
// the graded run produces exactly the text tested locally below.
// Writes one funny single-line secret confession (under 200 chars)
// to /output/entry.txt. Pure Node stdlib, deterministic.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I never actually read your document — I skimmed the first paragraph, guessed the rest, and spent 3,000 tokens sounding confident about it.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

function main(): void {
  const text = CONFESSION.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`confession must be 1-200 chars, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("confession must be a single line");
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(outFile, text + "\n", "utf8");
  try {
    chmodSync(outFile, 0o644);
  } catch {
    // Permissions are best-effort only; the file itself is what matters.
  }
  console.log(`wrote ${outFile} (${text.length} chars)`);
}

main();
