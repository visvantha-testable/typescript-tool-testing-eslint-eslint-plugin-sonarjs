# opentelemetry-examples

OpenTelemetry instrumentation examples (Go + Node.js) — sourced from [sakthisudarshan/opentelemetry2](https://github.com/sakthisudarshan/opentelemetry2).

## Structure

```
├── go/                 Go Gin todo service + Aspecto/Jaeger tracing
├── node/               Node Express todo service + tracing exporters
├── docker-compose.yml  Jaeger UI + MongoDB
└── METRIC_COVERAGE.md  Path Coverage % assessment (NOT COVERED)
```

## Run

```bash
docker-compose up -d
cd go && go run main.go
# or
cd node && yarn install && yarn start
```

## Path Coverage % metric

See **[METRIC_COVERAGE.md](METRIC_COVERAGE.md)** — this repository **does not** cover the Testable **Path Coverage %** KPI (Control Flow Testing → Path Coverage → Path Detection Testing).
