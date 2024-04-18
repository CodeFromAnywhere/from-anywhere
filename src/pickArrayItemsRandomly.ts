export const shuffleNumbers = (numbers: number[]) =>
  numbers.sort(() => {
    return Math.random() - 0.5;
  });

export const pickArrayItemsRandomly = <T extends any>(
  list: T[],
  amount: number
): T[] => {
  if (list.length <= amount) {
    return list;
  }
  const indexes = list.map((_, index) => index);
  const shuffled = shuffleNumbers(indexes);
  const indexesToPick = shuffled.slice(0, amount);
  const newList = indexesToPick.map((index) => list[index]);
  return newList;
};
