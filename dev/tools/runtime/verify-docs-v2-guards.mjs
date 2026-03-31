import path from "node:path";
import { access, readFile } from "node:fs/promises";

const root = process.cwd();
const requiredDocs = [
  "docs/V2/HOME.md",
  "docs/V2/TRUTH.md",
  "docs/V2/RULES.md",
  "docs/V2/PLAN.md",
  "docs/V2/ARCHIVE.md",
  "docs/V2/ARCHITECTURE_MAP.md"
];

async function main() {
  for (const relPath of requiredDocs) {
    await access(path.join(root, relPath));
  }

  const home = await readFile(path.join(root, "docs/V2/HOME.md"), "utf8");
  if (!home.includes("Documentation 2.0")) {
    throw new Error("[DOCS_V2_GUARD] docs/V2/HOME.md missing expected heading marker");
  }

  console.log(`[DOCS_V2_GUARD] OK files=${requiredDocs.length}`);
}

try {
  await main();
} catch (error) {
  console.error(String(error?.message || error));
  process.exit(1);
}
