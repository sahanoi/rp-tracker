/**
 * Reads style-prefix.txt + prompts.json, writes prompts.resolved.json with fullPrompt on each row.
 * Use style-prefix-anti-photo.txt by setting STYLE_FILE env: STYLE_FILE=style-prefix-anti-photo.txt node resolve-prompts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const styleName = process.env.STYLE_FILE ?? "style-prefix.txt";
const style = fs.readFileSync(path.join(__dirname, styleName), "utf8").trim();
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, "prompts.json"), "utf8"));

const resolved = {
  ...raw,
  styleFileUsed: styleName,
  prompts: raw.prompts.map((p) => ({
    ...p,
    fullPrompt: `${style}\n\nScene: ${p.scene}`,
  })),
};

fs.writeFileSync(
  path.join(__dirname, "prompts.resolved.json"),
  `${JSON.stringify(resolved, null, 2)}\n`,
  "utf8",
);

console.log(
  `Wrote prompts.resolved.json (${resolved.prompts.length} prompts, style: ${styleName})`,
);
