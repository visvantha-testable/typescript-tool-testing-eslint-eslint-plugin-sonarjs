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
