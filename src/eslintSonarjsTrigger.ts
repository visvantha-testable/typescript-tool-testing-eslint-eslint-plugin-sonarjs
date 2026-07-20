import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildBaseOutput,
  computeMetrics,
  runCoverage,
  runEslint,
} from "./metrics/pathCoverageMetrics.js";
import { exportPlatformBundle } from "./platform/exportPlatformBundle.js";
import { verifyEslintSonarjsJson } from "./verify/verifyEslintSonarjsJson.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = join(ROOT, "eslint_sonarjs.json");

export async function runTrigger(skipVerify = false): Promise<number> {
  console.log("Starting eslint + eslint-plugin-sonarjs platform trigger (Path Coverage %)");
  mkdirSync(join(ROOT, "artifacts", "training"), { recursive: true });

  const eslintMessages = runEslint(ROOT);
  const coverage = runCoverage(ROOT);
  const metrics = computeMetrics(eslintMessages, coverage);
  const base = buildBaseOutput(metrics, eslintMessages);

  exportPlatformBundle(ROOT, base, metrics);
  console.log(`Wrote ${OUTPUT}`);

  if (!skipVerify) {
    const code = verifyEslintSonarjsJson(OUTPUT);
    if (code !== 0) return code;
  }

  const final = JSON.parse(readFileSync(OUTPUT, "utf-8")) as {
    metrics: Array<{ score: number; covered: string }>;
  };
  const ok = final.metrics.every((m) => m.score === 100 && m.covered === "yes");
  console.log(`\nTRIGGER COMPLETE: eslint_sonarjs.json — Path Coverage 100/100=${ok}`);
  return ok ? 0 : 1;
}

const skip = process.argv.includes("--skip-verify");
runTrigger(skip).then((code) => process.exit(code));
