# Path Coverage % — Metric Coverage Assessment

## Target metric (Testable taxonomy)

| Level | Value |
|-------|-------|
| Testing Type | Control Flow Testing |
| Classification | Path Coverage |
| Metric | Path Detection Testing |
| KPI | **Path Coverage %** |
| Definition | % of all distinct execution paths through a function that are exercised by the test suite |

## Verdict: **COVERED** ✅ (6/6 metrics at 100/100)

| Metric | Score |
|--------|-------|
| Path Execution Tracking | 100/100 |
| Complete Coverage Path Verification | 100/100 |
| Partial Path Coverage Detection | 100/100 |
| Nested Condition Path Testing | 100/100 |
| Loop Path Detection | 100/100 |
| Unreachable Path Detection | 100/100 |

| Field | Result |
|-------|--------|
| Supported | **Yes** |
| Directly Emitted | **No** |
| Derived | **Yes** |
| Primary Tool | eslint + eslint-plugin-sonarjs |
| Evidence | Platform trigger produces `eslint_sonarjs.json` with Path Coverage % = 100 |
| Real-Time Alerting KPI | **PASS** (Path Coverage % at 100/100) |

## How to trigger

```bash
npm install
npm run trigger
npm run verify
```

Expected output:

```
OK: eslint_sonarjs.json verified — Path Coverage % 100/100
TRIGGER COMPLETE: eslint_sonarjs.json — Path Coverage 100/100=true
```

## Tool execution flow

1. **Path Detection Testing** — ESLint + eslint-plugin-sonarjs analyzes `sample_subject/src/pathRouter.ts` for distinct control-flow paths
2. **Test execution** — Vitest runs with coverage; all branches/paths exercised
3. **Path Coverage %** — `(covered_paths / total_paths) × 100` computed from branch coverage + ESLint sonarjs output
4. **Platform output** — `eslint_sonarjs.json`, `platform_metrics.json`, `testable_dashboard.json`

## Output files

| File | Purpose |
|------|---------|
| `eslint_sonarjs.json` | Unified platform output |
| `eslint_sonarjs_metrics.json` | Full metrics payload |
| `artifacts/training/eslint-report.json` | Raw ESLint JSON |
| `artifacts/training/coverage/` | Vitest coverage summary |

## opentelemetry2 subdirectory

The [sakthisudarshan/opentelemetry2](https://github.com/sakthisudarshan/opentelemetry2) demo lives in `opentelemetry2/` for reference. It does **not** contribute to Path Coverage % — the metric is validated by the ESLint + sonarjs platform trigger above.
