import { describe, expect, it } from "vitest";
import {
  classifyScore,
  combinePaths,
  routeAction,
  switchPath,
} from "../src/pathRouter.js";

describe("pathRouter — full path coverage", () => {
  it("classifyScore covers all branches", () => {
    expect(classifyScore(-1)).toBe("invalid");
    expect(classifyScore(25)).toBe("fail");
    expect(classifyScore(60)).toBe("pass");
    expect(classifyScore(90)).toBe("excellent");
  });

  it("routeAction covers both paths", () => {
    expect(routeAction(true, 5)).toBe(10);
    expect(routeAction(false, 5)).toBe(6);
  });

  it("switchPath covers all cases", () => {
    expect(switchPath(1)).toBe("alpha");
    expect(switchPath(2)).toBe("beta");
    expect(switchPath(3)).toBe("gamma");
    expect(switchPath(99)).toBe("unknown");
  });

  it("combinePaths covers add and mul", () => {
    expect(combinePaths(2, 3, "add")).toBe(5);
    expect(combinePaths(2, 3, "mul")).toBe(6);
  });
});
