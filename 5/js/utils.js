export const generateId = (start = 0) => {
  let id = start;

  return () => ++id;
};

export const getRandomNumber = (max, min = 0) => {
  if (min < 0 || max < 0) {
    return 0;
  }

  if (min > max) {
    [max, min] = [min, max];
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomArrayElement = (arr) =>
  arr[getRandomNumber(arr.length - 1)];
