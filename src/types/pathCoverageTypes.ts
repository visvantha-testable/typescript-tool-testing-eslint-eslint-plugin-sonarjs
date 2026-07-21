export interface PathCoverageMetrics {
  total_paths: number;
  covered_paths: number;
  uncovered_paths: number;
  path_coverage_percent: number;
  branch_total: number;
  branch_covered: number;
  eslint_error_count: number;
  eslint_warning_count: number;
  sonarjs_rules_active: number;
  files_analyzed: number;
}

export interface EslintMessage {
  ruleId: string | null;
  severity: number;
  message: string;
  filePath: string;
}

export interface CoverageSummary {
  total: { branches: { total: number; covered: number; pct: number } };
  [filePath: string]:
    | {
        branches?: { total?: number; covered?: number; pct?: number };
        lines?: { total?: number; covered?: number; pct?: number };
        statements?: { total?: number; covered?: number; pct?: number };
        functions?: { total?: number; covered?: number; pct?: number };
      }
    | { branches: { total: number; covered: number; pct: number } }
    | undefined;
}
