import { describe, expect, it } from "vitest";
import { initializeRover } from "./mars_rover";

describe("initializeRover", () => {
  it("should work", () => {
    expect(initializeRover(1, 2, "N")).toEqual({ x: 1, y: 2, direction: "N" });
  });
});
