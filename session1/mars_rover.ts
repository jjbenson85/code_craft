export type RoverState = {
  x: number;
  y: number;
  direction: CardinalDirection;
};

export const roverCommands = ["F", "B", "L", "R"] as const;
export type RoverCommand = (typeof roverCommands)[number];
export const command = {
  FORWARD: "F",
  BACKWARD: "B",
  LEFT: "L",
  RIGHT: "R",
} as const;

export const cardinalDirections = ["N", "E", "S", "W"] as const;
export type CardinalDirection = (typeof cardinalDirections)[number];

export const direction = {
  NORTH: "N",
  EAST: "E",
  SOUTH: "S",
  WEST: "W",
} as const;

export function initializeRover({
  x,
  y,
  direction,
}: {
  x: number;
  y: number;
  direction: CardinalDirection;
}): RoverState {
  if (x !== Math.round(x) || y !== Math.round(y)) {
    throw new Error(`Invalid coordinates: x:${x}, y:${y} should be integers`);
  }
  if (!["N", "E", "S", "W"].includes(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }

  return {
    x,
    y,
    direction,
  };
}

export function parseCommands(instructions: string): RoverCommand[] {
  return instructions
    .split("")
    .filter((e) => ["F", "B", "L", "R"].includes(e)) as RoverCommand[];
}

export function moveForward(state: RoverState): RoverState {
  switch (state.direction) {
    case "N":
      return { ...state, y: state.y + 1 };
    case "E":
      return { ...state, x: state.x + 1 };
    case "S":
      return { ...state, y: state.y - 1 };
    case "W":
      return { ...state, x: state.x - 1 };
  }
}

export function moveBackward(state: RoverState): RoverState {
  switch (state.direction) {
    case "N":
      return { ...state, y: state.y - 1 };
    case "E":
      return { ...state, x: state.x - 1 };
    case "S":
      return { ...state, y: state.y + 1 };
    case "W":
      return { ...state, x: state.x + 1 };
  }
}

export function turnLeft(state: RoverState): RoverState {
  switch (state.direction) {
    case "N":
      return { ...state, direction: "W" };
    case "E":
      return { ...state, direction: "N" };
    case "S":
      return { ...state, direction: "E" };
    case "W":
      return { ...state, direction: "S" };
  }
}

export function turnRight(state: RoverState): RoverState {
  switch (state.direction) {
    case "N":
      return { ...state, direction: "E" };
    case "E":
      return { ...state, direction: "S" };
    case "S":
      return { ...state, direction: "W" };
    case "W":
      return { ...state, direction: "N" };
  }
}

export function updateCoordinates(initState: RoverState, instructions: string) {
  const commands = parseCommands(instructions);
  const state = commands.reduce((state, command) => {
    switch (command) {
      case "F":
        return moveForward(state);
      case "B":
        return moveBackward(state);
      case "L":
        return turnLeft(state);
      case "R":
        return turnRight(state);
    }
  }, initState);

  return state;
}
