import { readdir } from "node:fs/promises";
import { createHash } from "node:crypto";

export function toPosixPath(value) {
  return String(value || "").replaceAll("\\", "/");
}

export function compareAlpha(a, b) {
  return String(a || "").localeCompare(String(b || ""), "en", { sensitivity: "base" });
}

export function sha256Hex(input) {
  return createHash("sha256").update(input).digest("hex");
}

export async function listFilesRecursive(rootDir) {
  const out = [];

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    entries.sort((a, b) => compareAlpha(a.name, b.name));
    for (const entry of entries) {
      const next = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        await walk(next);
      } else if (entry.isFile()) {
        out.push(next);
      }
    }
  }

  await walk(rootDir);
  return out;
}
