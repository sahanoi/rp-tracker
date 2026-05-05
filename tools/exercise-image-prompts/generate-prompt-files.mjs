/**
 * Writes one .txt per exercise id for batch tools / local LLM pipelines.
 * Run: node resolve-prompts.mjs && node generate-prompt-files.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolvedPath = path.join(__dirname, "prompts.resolved.json");
if (!fs.existsSync(resolvedPath)) {
  console.error("Missing prompts.resolved.json — run: node resolve-prompts.mjs");
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));
const outDir = path.join(__dirname, "out", "prompt-text");
fs.mkdirSync(outDir, { recursive: true });

for (const p of data.prompts) {
  fs.writeFileSync(
    path.join(outDir, `${p.id}.txt`),
    `${p.fullPrompt}\n`,
    "utf8",
  );
}

console.log(`Wrote ${data.prompts.length} files under ${outDir}`);
