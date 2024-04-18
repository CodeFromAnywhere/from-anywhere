/**
 Insert an array or item inside of an array before a certain index
 
 Example:

 ```ts

 const testArray = [1, 2, 3, 4, 5];
 const result = insertAt(testArray, [99, 100], 2);
 console.log({ testArray, result });

 ```
 */

export const insertAt = <T>(
  array: T[],
  items: T | T[],
  /**
   *
   */
  beforeIndex: number
): T[] => {
  const itemsArray = Array.isArray(items) ? items : [items];

  // NB: slice makes copies
  const before = array.slice(0, beforeIndex);
  const after = array.slice(beforeIndex);
  return [...before, ...itemsArray, ...after];
};

/**
 removes an index from an array

 example:
 
 ```ts
const exampleArray = ["a", "b", "c", "d", "e"];
console.log(removeIndexFromArray(exampleArray, 2)); //c should be removed
```
 */
export const removeIndexFromArray = <T>(array: T[], index: number) => {
  const before = array.slice(0, index);
  const after = array.slice(index + 1);
  return [...before, ...after];
};

/**
 * finds the last index of an array where a certain filter holds true
 */
export const findLastIndex = <T>(array: T[], findFn: (item: T) => boolean) => {
  const lastIndex = array
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => findFn(item))
    .pop()?.index;

  return lastIndex;
};

/**
 * Takes an item from an index of an array and put it somewhere at another index
 */
export const putIndexAtIndex = <T>(
  array: T[],
  index: number,
  toIndex: number
) => {
  const item = array[index];
  const arrayWithoutIndex = removeIndexFromArray(array, index);
  const changedArray = insertAt(arrayWithoutIndex, item, toIndex);
  return changedArray;
};
