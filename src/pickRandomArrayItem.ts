export const pickRandomArrayItem = <T>(array: T[]) => {
  return array[Math.floor((array.length - 1) * Math.random())];
};
