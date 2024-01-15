import { describe, expect, it } from "vitest";
import {
  RoverState,
  initializeRover,
  moveBackward,
  moveForward,
  parseInstructions,
  turnLeft,
  turnRight,
  updateCoordinates,
} from "./mars_rover";

describe("initializeRover", () => {
  it("should initialise state", () => {
    expect(initializeRover(1, 2, "N")).toEqual({ x: 1, y: 2, direction: "N" });
    expect(initializeRover(-1, 2, "E")).toEqual({
      x: -1,
      y: 2,
      direction: "E",
    });
    expect(initializeRover(10, 20, "S")).toEqual({
      x: 10,
      y: 20,
      direction: "S",
    });
    expect(initializeRover(0, 0, "W")).toEqual({ x: 0, y: 0, direction: "W" });
  });

  it("should throw an error when passing non-integer coordinates", () => {
    expect(() => initializeRover(0.5, 0, "N")).toThrow();
    expect(() => initializeRover(0, 0.1, "N")).toThrow();
    expect(() => initializeRover(0.5, 0.1, "N")).toThrow();
  });

  it("should throw an error when passing invalid starting coordinate", () => {
    // @ts-expect-error
    expect(() => initializeRover(0.5, 0, "X")).toThrow();
    // @ts-expect-error
    expect(() => initializeRover(0.5, 0, "NN")).toThrow();
    // @ts-expect-error
    expect(() => initializeRover(0.5, 0, "")).toThrow();
  });
});

describe("parseInstructions", () => {
  it("should return RoverCommand array", () => {
    expect(parseInstructions("")).toEqual([]);
    expect(parseInstructions("FBLR")).toEqual(["F", "B", "L", "R"]);
    expect(parseInstructions("FFFBLRRR")).toEqual([
      "F",
      "F",
      "F",
      "B",
      "L",
      "R",
      "R",
      "R",
    ]);
    expect(parseInstructions("FXB")).toEqual(["F", "B"]);
  });
});

describe("moveForward", () => {
  it("should return a new state with the rover moved forward", () => {
    expect(moveForward({ x: 0, y: 0, direction: "N" })).toEqual({
      x: 0,
      y: 1,
      direction: "N",
    });

    expect(moveForward({ x: 0, y: 0, direction: "E" })).toEqual({
      x: 1,
      y: 0,
      direction: "E",
    });

    expect(moveForward({ x: 0, y: 0, direction: "S" })).toEqual({
      x: 0,
      y: -1,
      direction: "S",
    });

    expect(moveForward({ x: 0, y: 0, direction: "W" })).toEqual({
      x: -1,
      y: 0,
      direction: "W",
    });

    expect(moveForward({ x: 10, y: -10, direction: "N" })).toEqual({
      x: 10,
      y: -9,
      direction: "N",
    });
  });
});

describe("moveBackward", () => {
  it("should return a new state with the rover moved backward", () => {
    expect(moveBackward({ x: 0, y: 0, direction: "N" })).toEqual({
      x: 0,
      y: -1,
      direction: "N",
    });

    expect(moveBackward({ x: 0, y: 0, direction: "E" })).toEqual({
      x: -1,
      y: 0,
      direction: "E",
    });

    expect(moveBackward({ x: 0, y: 0, direction: "S" })).toEqual({
      x: 0,
      y: 1,
      direction: "S",
    });

    expect(moveBackward({ x: 0, y: 0, direction: "W" })).toEqual({
      x: 1,
      y: 0,
      direction: "W",
    });

    expect(moveBackward({ x: 10, y: -10, direction: "N" })).toEqual({
      x: 10,
      y: -11,
      direction: "N",
    });
  });
});

describe("turnLeft", () => {
  it("should return a new state with the rover turned left", () => {
    expect(turnLeft({ x: 0, y: 0, direction: "N" })).toEqual({
      x: 0,
      y: 0,
      direction: "W",
    });

    expect(turnLeft({ x: 0, y: 0, direction: "E" })).toEqual({
      x: 0,
      y: 0,
      direction: "N",
    });

    expect(turnLeft({ x: 0, y: 0, direction: "S" })).toEqual({
      x: 0,
      y: 0,
      direction: "E",
    });

    expect(turnLeft({ x: 0, y: 0, direction: "W" })).toEqual({
      x: 0,
      y: 0,
      direction: "S",
    });

    expect(turnLeft({ x: 10, y: -10, direction: "N" })).toEqual({
      x: 10,
      y: -10,
      direction: "W",
    });
  });
});

describe("turnRight", () => {
  it("should return a new state with the rover turned right", () => {
    expect(turnRight({ x: 0, y: 0, direction: "N" })).toEqual({
      x: 0,
      y: 0,
      direction: "E",
    });

    expect(turnRight({ x: 0, y: 0, direction: "E" })).toEqual({
      x: 0,
      y: 0,
      direction: "S",
    });

    expect(turnRight({ x: 0, y: 0, direction: "S" })).toEqual({
      x: 0,
      y: 0,
      direction: "W",
    });

    expect(turnRight({ x: 0, y: 0, direction: "W" })).toEqual({
      x: 0,
      y: 0,
      direction: "N",
    });

    expect(turnRight({ x: 10, y: -10, direction: "N" })).toEqual({
      x: 10,
      y: -10,
      direction: "E",
    });
  });
});

describe("updateCoordinates", () => {
  it("should return new state with all instructions applied", () => {
    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "")).toEqual({
      x: 0,
      y: 0,
      direction: "N",
    });

    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "FFF")).toEqual({
      x: 0,
      y: 3,
      direction: "N",
    });

    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "FBB")).toEqual({
      x: 0,
      y: -1,
      direction: "N",
    });

    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "LLLL")).toEqual({
      x: 0,
      y: 0,
      direction: "N",
    });

    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "RR")).toEqual({
      x: 0,
      y: 0,
      direction: "S",
    });

    expect(updateCoordinates({ x: 0, y: 0, direction: "N" }, "FFRBLL")).toEqual(
      {
        x: -1,
        y: 2,
        direction: "W",
      }
    );

    expect(
      updateCoordinates({ x: 0, y: 0, direction: "N" }, "FXFXRXBfffXL1L")
    ).toEqual({
      x: -1,
      y: 2,
      direction: "W",
    });

    expect(
      updateCoordinates({ x: 100, y: 100, direction: "N" }, "FRFRFRFR")
    ).toEqual({
      x: 100,
      y: 100,
      direction: "N",
    });

    expect(
      updateCoordinates({ x: 100, y: 100, direction: "N" }, "FRFLFRFL")
    ).toEqual({
      x: 102,
      y: 102,
      direction: "N",
    });
  });
});
