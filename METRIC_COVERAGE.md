# Path Coverage % — Metric Coverage Assessment

Repository source: [sakthisudarshan/opentelemetry2](https://github.com/sakthisudarshan/opentelemetry2) (branch `add-go`)

## Target metric (Testable taxonomy)

| Level | Value |
|-------|-------|
| Testing Type | Control Flow Testing |
| Classification | Path Coverage |
| Metric | Path Detection Testing |
| KPI | **Path Coverage %** |
| Definition | % of all distinct execution paths through a function that are exercised by the test suite |

## Verdict: **NOT COVERED**

| Field | Result |
|-------|--------|
| Supported | **No** |
| Directly Emitted | **No** |
| Derived | **No** |
| Evidence | No test suite, no path/branch coverage tooling, no ESLint + sonarjs path detection |
| Comments | OpenTelemetry demo repo only — runnable Go/Node services with tracing; no automated path coverage measurement |

## Repository contents

| Component | Language | Purpose |
|-----------|----------|---------|
| `go/` | Go 1.17 | Gin todo API + OpenTelemetry (Aspecto/Jaeger) |
| `node/` | JavaScript | Express todo API + OpenTelemetry exporters |
| `docker-compose.yml` | — | Jaeger + MongoDB for local tracing |

## Gap analysis

| Requirement for Path Coverage % | Present? |
|----------------------------------|----------|
| Test suite exercising code paths | ❌ No `*_test.go`, no Node test files |
| Path / branch coverage tool | ❌ No `go test -cover`, no vitest/nyc/c8 |
| Path detection (static analysis) | ❌ No eslint-plugin-sonarjs or equivalent |
| Coverage report / JSON output | ❌ None |
| Multi-path sample subject | ⚠️ Apps have branches but no tests drive them |

## What would be needed

1. **Path Detection Testing** — static tool (e.g. eslint-plugin-sonarjs) to enumerate distinct paths in functions
2. **Test execution** — unit/integration tests hitting each path
3. **Path Coverage %** — `(covered_paths / total_paths) × 100` from coverage + path map

## Conclusion

Replacing the training repo with `opentelemetry2` **does not** satisfy the **Path Coverage %** white-box metric. This repo is suitable for **OpenTelemetry tracing demos**, not Control Flow / Path Coverage validation.
