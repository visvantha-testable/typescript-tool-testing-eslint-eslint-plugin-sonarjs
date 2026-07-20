import { describe, expect, it } from "vitest";
import { flatten, scheduleTask, sumWhile, detectUnreachableFlag } from "../src/pathComplexity.js";

describe("pathComplexity — nested, loop, and path execution coverage", () => {
  it("scheduleTask covers nested condition paths", () => {
    expect(scheduleTask(false, "low", 0)).toBe("disabled");
    expect(scheduleTask(true, "critical", 15)).toBe("critical-max-retries");
    expect(scheduleTask(true, "critical", 5)).toBe("critical-retry");
    expect(scheduleTask(true, "critical", 0)).toBe("critical-immediate");
    expect(scheduleTask(true, "high", 1)).toBe("high-retry");
    expect(scheduleTask(true, "high", 0)).toBe("high-once");
    expect(scheduleTask(true, "medium", 0)).toBe("medium-queue");
    expect(scheduleTask(true, "low", 0)).toBe("low-queue");
  });

  it("flatten covers loop paths", () => {
    expect(flatten([])).toEqual([]);
    expect(flatten([[1, 2], [3]])).toEqual([1, 2, 3]);
    expect(flatten([[-1, 2]])).toEqual([2]);
  });

  it("sumWhile covers while loop paths", () => {
    expect(sumWhile(0)).toBe(0);
    expect(sumWhile(4)).toBe(6);
  });

  it("detectUnreachableFlag covers both branches", () => {
    expect(detectUnreachableFlag(true)).toBe("on");
    expect(detectUnreachableFlag(false)).toBe("off");
  });
});
