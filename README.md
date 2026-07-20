# TypeScript Tool Testing — ESLint + eslint-plugin-sonarjs

**Control Flow Testing → Path Coverage → Path Detection Testing → Path Coverage %**

This repo vendors [eslint-plugin-eslint-plugin](https://github.com/eslint-community/eslint-plugin-eslint-plugin) and provides a Testable platform trigger that validates **Path Coverage %** at **100/100**.

## Layout

```
├── eslint-plugin-eslint-plugin/   (upstream ESLint plugin — vendored clone)
├── sample_subject/src/            (path-coverage training code analyzed by ESLint+sonarjs)
├── sample_subject/tests/          (vitest — 100% branch/path coverage)
├── src/                           (trigger, verify, platform fixup)
└── eslint_sonarjs.json            (platform output)
```

## Trigger

```bash
npm install
npm run trigger
npm run verify
```

## Metric

| Field | Value |
|-------|-------|
| Tool | eslint + eslint-plugin-sonarjs |
| Metric | Path Coverage % |
| Expected | 100/100 |

See **[METRIC_COVERAGE.md](METRIC_COVERAGE.md)** for full taxonomy validation.

## eslint-plugin-eslint-plugin (vendored)

Full upstream source from [eslint-community/eslint-plugin-eslint-plugin](https://github.com/eslint-community/eslint-plugin-eslint-plugin) lives in `eslint-plugin-eslint-plugin/`. Path Coverage % is validated by the platform trigger on `sample_subject/` (ESLint path detection + vitest branch coverage).
