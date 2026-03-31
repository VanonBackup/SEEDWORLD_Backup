import { spawn } from "node:child_process";

const verifyOnly = process.argv.includes("--verify-only");

const checks = [
  ["node", ["dev/scripts/test-runner.mjs"]],
  ["node", ["dev/scripts/verify-evidence.mjs"]],
  ["node", ["dev/tools/runtime/verify-docs-v2-guards.mjs"]],
  ["node", ["dev/tools/runtime/governance-policy-verify.mjs"]],
  ["node", ["dev/tools/runtime/governance-modularity-verify.mjs"]],
  ["node", ["dev/tools/runtime/check-global-redundancy.mjs"]]
];

function run(cmd, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", env });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} failed with ${code}`))));
  });
}

for (const [cmd, args] of checks) {
  const env = verifyOnly ? { ...process.env, RUNTIME_VERIFY_READ_ONLY: "1" } : process.env;
  await run(cmd, args, env);
}

console.log(`[REQUIRED_CHECKS] PASS_REPRODUCED verify_only=${verifyOnly ? "1" : "0"}`);
