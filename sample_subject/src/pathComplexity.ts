/**
 * Extended path coverage sample — nested conditions, loops, multi-path functions.
 */
export type TaskPriority = "low" | "medium" | "high" | "critical";

export function scheduleTask(
  enabled: boolean,
  priority: TaskPriority,
  retries: number,
): string {
  if (!enabled) {
    return "disabled";
  }
  if (priority === "critical") {
    if (retries > 3) {
      if (retries > 10) {
        return "critical-max-retries";
      }
      return "critical-retry";
    }
    return "critical-immediate";
  }
  if (priority === "high") {
    return retries > 0 ? "high-retry" : "high-once";
  }
  if (priority === "medium") {
    return "medium-queue";
  }
  return "low-queue";
}

export function flatten(values: number[][]): number[] {
  const result: number[] = [];
  for (const row of values) {
    for (const cell of row) {
      if (cell >= 0) {
        result.push(cell);
      }
    }
  }
  return result;
}

export function sumWhile(n: number): number {
  let total = 0;
  let i = 0;
  while (i < n) {
    total += i;
    i += 1;
  }
  return total;
}

export function detectUnreachableFlag(flag: boolean): "on" | "off" {
  if (flag) {
    return "on";
  }
  return "off";
}
