/**
 * all letters of b can be found in a, in order (but other letters in between are allowed)
 */
export const hasAllLetters = (a: string, b: string) => {
  const lettersLeft = a
    .split("")
    .reduce((lettersLeft, lowercaseValueLetter) => {
      if (lettersLeft[0] === lowercaseValueLetter) {
        lettersLeft.shift();
      }

      return lettersLeft;
    }, b.split(""));

  return lettersLeft.length === 0;
};
