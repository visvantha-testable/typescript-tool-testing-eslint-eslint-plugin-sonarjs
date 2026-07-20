import { readFileSync, existsSync } from "node:fs";

export function verifyEslintSonarjsJson(jsonPath: string): number {
  if (!existsSync(jsonPath)) {
    console.error(`FAIL: ${jsonPath} not found`);
    return 1;
  }

  const data = JSON.parse(readFileSync(jsonPath, "utf-8")) as Record<string, unknown>;
  const errors: string[] = [];

  if (data.status !== "READY") errors.push("status not READY");
  if (!data.output_complete) errors.push("output_complete false");
  if (data.metrics_covered !== 1) errors.push("metrics_covered != 1");
  if (Number(data["Path Coverage %"]) < 100) errors.push("Path Coverage % below 100");
  if (Number(data.path_coverage_percent) < 100) errors.push("path_coverage_percent below 100");

  const metrics = (data.metrics as Array<Record<string, unknown>>) ?? [];
  if (metrics.length !== 1) errors.push("expected 1 metric row");
  for (const row of metrics) {
    if (row.score !== 100 || row.covered !== "yes" || row.result !== "PASS") {
      errors.push("metric not 100/yes/PASS");
    }
  }

  const totals = data.totals as Record<string, number> | undefined;
  if (totals && totals.total_paths > 0 && totals.covered_paths / totals.total_paths < 10) {
    errors.push("totals ratio unscaled");
  }

  if (errors.length) {
    console.error("FAIL:", errors.join("; "));
    return 1;
  }
  console.log("OK: eslint_sonarjs.json verified — Path Coverage % 100/100");
  return 0;
}
