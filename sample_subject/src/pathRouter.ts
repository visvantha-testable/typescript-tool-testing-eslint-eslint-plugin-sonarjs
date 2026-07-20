/**
 * Path router — multiple distinct execution paths for Path Coverage % training.
 * ESLint + eslint-plugin-sonarjs detects paths; vitest coverage proves all exercised.
 */
export type Grade = "invalid" | "fail" | "pass" | "excellent";

export function classifyScore(score: number): Grade {
  if (score < 0) {
    return "invalid";
  }
  if (score < 50) {
    return "fail";
  }
  if (score < 75) {
    return "pass";
  }
  return "excellent";
}

export function routeAction(flag: boolean, value: number): number {
  if (flag) {
    return value * 2;
  }
  return value + 1;
}

export function switchPath(code: number): string {
  switch (code) {
    case 1:
      return "alpha";
    case 2:
      return "beta";
    case 3:
      return "gamma";
    default:
      return "unknown";
  }
}

export function combinePaths(a: number, b: number, mode: "add" | "mul"): number {
  if (mode === "add") {
    return a + b;
  }
  return a * b;
}
