import { describe, expect, it } from "vitest";
import { getRandomChar } from "./getRandom";

describe("getRandomChar", () => {
  it("should return a random character", () => {
    expect(getRandomChar()).toBeTypeOf("string");
  });
});
