import path from "node:path";
import { readFile } from "node:fs/promises";

const root = process.cwd();
const contractPath = path.join(root, "app/src/sot/governance-engine.sot.v2.json");

const raw = await readFile(contractPath, "utf8");
const contract = JSON.parse(raw);

if (!contract || typeof contract !== "object") {
  throw new Error("[GOVERNANCE_MODULARITY] invalid contract payload");
}

if (!Array.isArray(contract.rules) || contract.rules.length === 0) {
  throw new Error("[GOVERNANCE_MODULARITY] missing governance rules[]");
}

if (!Array.isArray(contract.entry_points) || contract.entry_points.length === 0) {
  throw new Error("[GOVERNANCE_MODULARITY] missing entry_points[]");
}

console.log(`[GOVERNANCE_MODULARITY] OK rules=${contract.rules.length} entry_points=${contract.entry_points.length}`);
