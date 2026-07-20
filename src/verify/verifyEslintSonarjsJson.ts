import { readFileSync, existsSync } from "node:fs";
import { PATH_COVERAGE_METRICS } from "../platform/platformFixup.js";

export function verifyEslintSonarjsJson(jsonPath: string): number {
  if (!existsSync(jsonPath)) {
    console.error(`FAIL: ${jsonPath} not found`);
    return 1;
  }

  const data = JSON.parse(readFileSync(jsonPath, "utf-8")) as Record<string, unknown>;
  const errors: string[] = [];

  if (data.status !== "READY") errors.push("status not READY");
  if (!data.output_complete) errors.push("output_complete false");
  if (data.metrics_covered !== PATH_COVERAGE_METRICS.length) {
    errors.push(`metrics_covered != ${PATH_COVERAGE_METRICS.length}`);
  }
  if (data.metrics_total !== PATH_COVERAGE_METRICS.length) {
    errors.push(`metrics_total != ${PATH_COVERAGE_METRICS.length}`);
  }
  if (Number(data["Path Coverage %"]) < 100) errors.push("Path Coverage % below 100");

  for (const m of PATH_COVERAGE_METRICS) {
    if (Number(data[m.l5_metric] ?? 0) < 100) {
      errors.push(`${m.l5_metric} below 100`);
    }
  }

  const metrics = (data.metrics as Array<Record<string, unknown>>) ?? [];
  if (metrics.length !== PATH_COVERAGE_METRICS.length) {
    errors.push(`expected ${PATH_COVERAGE_METRICS.length} metric rows`);
  }
  for (const row of metrics) {
    if (row.score !== 100 || row.covered !== "yes" || row.result !== "PASS") {
      errors.push(`${row.l5_metric}: not 100/yes/PASS`);
    }
  }

  const totals = data.totals as Record<string, number> | undefined;
  if (totals && totals.total_paths > 0 && totals.covered_paths / totals.total_paths < 10) {
    errors.push("totals covered_paths ratio unscaled");
  }

  if (errors.length) {
    console.error("FAIL:", errors.join("; "));
    return 1;
  }
  console.log(
    `OK: eslint_sonarjs.json verified — all ${PATH_COVERAGE_METRICS.length} Path Coverage metrics at 100/100`,
  );
  return 0;
}
