/**
 * takes an object and a subset of its keys and returns a subset of that object
 *
 * input: { x: "a", y: "b", z: "c" } and ["x"]
 *
 * output: { x: "a" }
 */
export const getSubsetFromObject = <T, K extends readonly (keyof T)[]>(
  object: T,
  keys: K
) => {
  type Subset = typeof keys[number];

  const subsetObject = keys.reduce((obj, key) => {
    return { ...obj, [key]: object[key] };
  }, {} as Partial<T>) as Pick<T, Subset>;
  return subsetObject;
};
//const result = getSubsetFromObject({a:"hi",b:9,c:true}, ["a"])
