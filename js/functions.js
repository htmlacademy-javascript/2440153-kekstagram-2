
// eslint-disable-next-line no-unused-vars
const isValidStr = (str, maxLength, minLength = 0) =>
  str.length >= minLength && str.length <= maxLength;

const isSymbol = (str) => str.toLowerCase() === str.toUpperCase();
const isLettersEqual = (str1, str2) => str1.toLowerCase() === str2.toLowerCase();

// eslint-disable-next-line no-unused-vars
const isPalindrome = (str) => {
  if (typeof str !== 'string') {
    throw new Error('str must be string');
  }

  let start = 0;
  let end = str.length - 1;

  while (start < end) {
    const firstLetter = str[start];
    const lastLetter = str[end];

    if (isSymbol(firstLetter)) {
      start++;
      continue;
    }

    if (isSymbol(lastLetter)) {
      end--;
      continue;
    }

    if (isLettersEqual(firstLetter, lastLetter)) {
      start++;
      end--;
      continue;
    }

    return false;
  }

  return true;
};

// eslint-disable-next-line no-unused-vars
function onlyNums(num) {
  const isStr = String(num);
  let result = '';

  for (let i = 0; i < isStr.length; i++) {
    if (isStr[i] >= '0' && isStr[i] <= '9') {
      result += isStr[i];
    }
  }

  if (!Number(result)) {
    return NaN;
  }

  return Number(result);
}


