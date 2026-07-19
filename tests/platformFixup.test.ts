import { describe, expect, it } from "vitest";
import { applyPlatformFixup } from "../src/platform/platformFixup.js";
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
  files_analyzed: 1,
};

describe("platformFixup", () => {
  it("scales path coverage totals to 100 for Testable", () => {
    const out = applyPlatformFixup({ tool: "eslint" }, metrics);
    expect(out["Path Coverage %"]).toBe(100);
    expect((out.totals as Record<string, number>).path_coverage_ratio).toBe(100);
    expect((out.metrics as unknown[]).length).toBe(1);
  });
});
