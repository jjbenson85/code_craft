export const getRandomNumber = (max = Number.MAX_SAFE_INTEGER - 1) => {
  return Math.random() * (max + 1);
};
export const getRandomInt = (max = Number.MAX_SAFE_INTEGER - 1) => {
  return Math.floor(getRandomNumber(max));
};

export const getRandomNonInteger = (max = Number.MAX_SAFE_INTEGER - 1) => {
  let random = 1;

  while (Number.isInteger(random)) {
    random = getRandomNumber(max);
  }

  return random;
};

export const getRandomFromArray = <T>(array: T[] | readonly T[]) => {
  return array[getRandomInt(array.length - 1)];
};

export const getRandomChar = () => {
  //Note: 0xffff is the highest code point a character can have (if we use that most chars are chinese)
  return String.fromCharCode(getRandomInt(0x00ff));
};
