

export const getPluralWord = (count, [one, two, five]) => {
  const someNum = Math.abs(count) % 100;
  const oneNum = someNum % 10;

  if (someNum > 10 && someNum < 20) {
    return five;
  }

  if (oneNum > 1 && oneNum < 5) {
    return two;
  }

  if (oneNum === 1) {
    return one;
  }

  return five;
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
