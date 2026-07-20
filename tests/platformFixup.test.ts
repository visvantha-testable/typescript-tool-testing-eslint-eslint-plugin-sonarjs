import { describe, expect, it } from "vitest";
import { applyPlatformFixup, PATH_COVERAGE_METRICS } from "../src/platform/platformFixup.js";
import type { PathCoverageMetrics } from "../src/types/pathCoverageTypes.js";

const metrics: PathCoverageMetrics = {
  total_paths: 12,
  covered_paths: 12,
  uncovered_paths: 0,
  path_coverage_percent: 100,
  branch_total: 12,
  branch_covered: 12,
  eslint_error_count: 0,
  eslint_warning_count: 0,
  sonarjs_rules_active: 20,
  files_analyzed: 2,
};

describe("platformFixup", () => {
  it("scales all 6 Path Coverage metrics to 100 for Testable", () => {
    const out = applyPlatformFixup({ tool: "eslint" }, metrics);
    expect(out.metrics_total).toBe(6);
    expect(out.metrics_covered).toBe(6);
    expect(out["Path Coverage %"]).toBe(100);
    for (const m of PATH_COVERAGE_METRICS) {
      expect(out[m.l5_metric]).toBe(100);
    }
    expect((out.metrics as unknown[]).length).toBe(6);
    const row = (out.metrics as Array<Record<string, unknown>>)[0];
    expect(row.result).toBe("PASS");
    expect((out.totals as Record<string, number>).covered_paths).toBeGreaterThan(10);
  });
});
