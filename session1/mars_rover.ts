type RoverState = {
  x: number;
  y: number;
  direction: CardinalDirection;
};

type RoverCommand = "F" | "B" | "L" | "R";

type CardinalDirection = "N" | "E" | "S" | "W";

export function initializeRover(
  x: number,
  y: number,
  direction: CardinalDirection
): RoverState {
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

function parseInstructions(instructions: string): RoverCommand[] {
  return instructions
    .split("")
    .filter((e) => ["F", "B", "L", "R"].includes(e)) as RoverCommand[];
}

function moveForward(state: RoverState): RoverState {
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

function moveBackward(state: RoverState): RoverState {
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

function turnLeft(state: RoverState): RoverState {
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

function turnRight(state: RoverState): RoverState {
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
  const commands = parseInstructions(instructions);
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

let state = initializeRover(0, 0, "N");

state = updateCoordinates(state, "FRF");
console.log(state);

// const instructions = "FXF RRLB";
// console.log(instructions, parseInstructions(instructions));
