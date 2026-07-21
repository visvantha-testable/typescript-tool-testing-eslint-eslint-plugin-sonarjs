# TypeScript Tool Testing — ESLint + eslint-plugin-sonarjs

**Control Flow Testing → Path Coverage → Path Detection Testing → Path Coverage %**

This repo vendors [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) and provides a Testable platform trigger that validates **Path Coverage %** at **100/100**.

## Layout

```
├── typescript-eslint/             (upstream monorepo — vendored clone)
├── sample_subject/src/            (path-coverage training code analyzed by ESLint+sonarjs)
├── sample_subject/tests/          (vitest — 100% branch/path coverage)
├── src/                           (trigger, verify, platform fixup)
└── eslint_sonarjs.json            (platform output)
```

## Trigger

```bash
npm install
npm test
npm run coverage
npm run trigger
npm run verify
```

Raw coverage artifacts are written to `artifacts/training/coverage/`:

- `coverage-summary.json`
- `coverage-final.json`
- `taxonomy_metrics.json` (named Path Detection Testing / Path Coverage % fields)

## Metric

| Field | Value |
|-------|-------|
| Tool | eslint + eslint-plugin-sonarjs |
| Metric | Path Coverage % |
| Expected | 100/100 |

See **[METRIC_COVERAGE.md](METRIC_COVERAGE.md)** for full taxonomy validation.

## typescript-eslint (vendored)

Full upstream monorepo from [typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) lives in `typescript-eslint/`. Path Coverage % is validated by the platform trigger on `sample_subject/` (ESLint path detection + vitest branch coverage).
