import { spawn } from "node:child_process";

const checks = [
  ["node", ["dev/tools/runtime/verify-docs-v2-guards.mjs"]],
  ["node", ["dev/tools/runtime/check-tem-structure.mjs"]],
  ["node", ["dev/tools/runtime/governance-coverage-verify.mjs"]]
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} failed with ${code}`))));
  });
}

for (const [cmd, args] of checks) {
  await run(cmd, args);
}

console.log("[GOVERNANCE_POLICY] OK");
