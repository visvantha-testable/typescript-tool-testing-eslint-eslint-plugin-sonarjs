# TypeScript Tool Testing — ESLint + eslint-plugin-sonarjs

**Control Flow Testing → Path Coverage → Path Detection Testing → Path Coverage %**

## Required Layout

```
├── package.json
├── package-lock.json
├── eslint.config.js          (eslint + eslint-plugin-sonarjs)
├── src/index.ts
├── sample_subject/src/       (multi-path TypeScript code)
├── sample_subject/tests/     (100% path coverage)
└── eslint_sonarjs.json       (platform output)
```

## ESLint raw output (White-box validation)

Enterprise TypeScript modules (`controllers/`, `services/`, `models/`, etc.) contain intentional ESLint violations for raw JSON extraction.

```bash
npm install
npm run lint:json
```

Generates `eslint_raw_output.json` (unmodified ESLint JSON formatter output).

Regenerate enterprise modules:

```bash
npm run generate:enterprise
```

## Path Coverage trigger (eslint-plugin-sonarjs)

```bash
npm run trigger
npm run verify
```

## Metric

| Field | Value |
|-------|-------|
| Tool | eslint + eslint-plugin-sonarjs |
| Metric | Path Coverage % |
| Expected | 100/100 |
