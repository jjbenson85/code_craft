import { describe, expect, it } from "vitest";
import {
  CardinalDirection,
  RoverCommand,
  RoverState,
  cardinalDirections,
  command,
  initializeRover,
  moveBackward,
  moveForward,
  parseCommands,
  roverCommands,
  turnLeft,
  turnRight,
  updateCoordinates,
} from "./mars_rover";
import {
  getRandomChar,
  getRandomFromArray,
  getRandomInt,
  getRandomNonInteger,
} from "../utils/getRandom";

const getRandomDirection = () => {
  return getRandomFromArray(cardinalDirections);
};

// Type as record to catch Extra commands if added
const roverCommandRecords: Record<RoverCommand, RoverCommand> = {
  F: "F",
  B: "B",
  L: "L",
  R: "R",
};
const getRandomRoverCommand = () => getRandomFromArray(roverCommands);

describe("initializeRover", () => {
  const inputs = Array.from(
    { length: 5 },
    (_) =>
      [getRandomInt(1000), getRandomInt(1000), getRandomDirection()] as const
  );
  it.each(inputs)(
    "should initialise state [x: %i, y: %i, direction: %s]",
    (x, y, direction) => {
      expect(initializeRover({ x, y, direction })).toEqual({ x, y, direction });
    }
  );

  const errorCoordInputs = Array.from({ length: 5 }, (_) => {
    return [
      getRandomNonInteger(1000),
      getRandomNonInteger(1000),
      getRandomDirection(),
    ] as const;
  });

  it.each(errorCoordInputs)(
    "should throw an error when passing non-integer coordinates: [x: %i, y: %i, direction: %s]",
    (x, y, direction) => {
      expect(() => initializeRover({ x, y, direction })).toThrow();
    }
  );

  const errorDirectionInputs = Array.from({ length: 5 }, (_) => {
    return [
      getRandomInt(1000),
      getRandomInt(1000),
      Math.random()
        .toString(36)
        .substring(getRandomInt(10) + 1) as CardinalDirection,
    ] as const;
  });

  it.each(errorDirectionInputs)(
    "should throw an error when passing invalid starting coordinate: [x: %i, y: %i, direction: %s]",
    (x, y, direction) => {
      expect(() => initializeRover({ x, y, direction })).toThrow();
    }
  );
});

const createArray = <T>(length: number, callBack: (i?: number) => T): T[] => {
  return Array.from({ length }, (_, i) => callBack(i));
};

describe("parseCommands", () => {
  const inputs = createArray(5, () =>
    createArray(100, getRandomRoverCommand).join("")
  );

  const dirtyInputs = createArray(5, () =>
    createArray(100, () => getRandomChar() + getRandomRoverCommand()).join("")
  );

  it.each(inputs)("should return array from input: %s", (input) => {
    const roverCommands = parseCommands(input);
    expect(roverCommands).toBeInstanceOf(Array);
  });

  it.each(inputs)("should return RoverCommands from input: %s", (input) => {
    const roverCommands = parseCommands(input);
    const isValidRoverCommands = roverCommands.every((e) =>
      roverCommands.includes(e)
    );
    expect(isValidRoverCommands).toEqual(true);
  });

  it.each(dirtyInputs)("should return array from firty input: %s", (input) => {
    const roverCommands = parseCommands(input);
    expect(roverCommands).toBeInstanceOf(Array);
  });

  it.each(dirtyInputs)(
    "should return RoverCommands from dirty input: %s",
    (input) => {
      const roverCommands = parseCommands(input);
      const isValidRoverCommands = roverCommands.every(
        (e) => roverCommandRecords[e]
      );
      expect(isValidRoverCommands).toEqual(true);
    }
  );
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
