import { mergeObjectsArray } from "./mergeObjectsArray.js";
export const noEmptyString = (
  input: string | undefined,
): string | undefined => {
  if (input === "") return undefined;
  return input;
};

export const sum = (items: number[]) => {
  const total = items.reduce((total, num) => {
    if (typeof num !== "number") {
      console.log("WTF", num);
    }
    return total + num;
  }, 0);

  return total;
};
// sum([1, 2, 3]);

/**
 * function that takes an array of functions and applies them one by one, on the value or the result of the previous function. Only possible if the type of the value stays the same.
 *
 * NB: don't do just "T" as this conflicts in tsx files.
 */
export const apply = <T extends any>(
  functions: ((input: T) => T)[],
  value: T,
) => {
  return functions.reduce((val, fn) => {
    return fn(val);
  }, value);
};

/**
 * creates an enum object from a readonly const array so you don't have to
 * ------
 * const taskNames = ["a","b","c"] as const;
 * type TaskNames = typeof taskNames[number];
 * const enummm = createEnum(taskNames);
 * (value of enummm: { a: "a", b: "b", c: "c" })
 */
export const createEnum = <T extends readonly string[]>(
  array: T,
): { [K in (typeof array)[number]]: K } =>
  array.reduce((previous, current) => {
    return { ...previous, [current]: current };
  }, {} as any);

/**
 * key should be of type string!
 *
 * input = [{path:"xyz"},{path:"xyz"},{path:"abc"}]
 * groupByKey(input, "path")
 * ouput: { xyz: [{path:"xyz"},{path:"xyz"}], abc: [{path:"abc"}]}
 */
export const groupByKey = <T extends { [key: string]: any }>(
  array: T[],
  key: keyof T,
) => {
  return array.reduce(
    (all, item) => {
      const newAll = all;

      const keyToUse: string = item[key as string];

      const already = newAll[keyToUse];
      if (!already) {
        // create a new parameter in the group-object
        newAll[item[key]] = [item];
      } else {
        // push to existing group-object parameter
        newAll[item[key]].push(item);
      }

      return newAll;
    },
    {} as { [key: string]: T[] },
  );
};

/**
 * checks if all items in an array are truthy
 */
export const isAllTrue = (array: boolean[]): boolean => {
  const result = array.find((x) => !x);
  //  console.log({ result });
  return result === undefined;
};

/**
 * DEPRECATED: should refactor everything to use onlyUnique2 and call it onlyUnique again
 *
 * to be used as a filter. removes duplicates
 */
export function onlyUnique<T extends unknown>(
  value: T,
  index: number,
  self: T[],
) {
  return self.findIndex((v) => v === value) === index;
}

/**
 * function that returns a filter function that can be used as a filter for any array. removes duplicates.
 *
 * optionally takes a compare function that should return a "true" if two instances are equal. if you use this function, make sure to pass a generic of the type the items will have, in order to make this equality function type safe as well
 *
 *
 */
export const onlyUnique2 =
  <U extends unknown>(isEqualFn?: (a: U, b: U) => boolean) =>
  <T extends U>(value: T, index: number, self: T[]) => {
    return (
      self.findIndex((v) => (isEqualFn ? isEqualFn(v, value) : v === value)) ===
      index
    );
  };

/**
 * Useful function to find duplicates
 */
export const onlyDuplicates =
  <U extends unknown>(isEqualFn?: (a: U, b: U) => boolean) =>
  <T extends U>(value: T, index: number, self: T[]) => {
    return (
      self.findIndex((v) => (isEqualFn ? isEqualFn(v, value) : v === value)) !==
      index
    );
  };

/**
 * if something is not an array, returns it as the first element of an array
 *
 * if the input is undefined, an empty array will be returned.
 *
 * NB: TODO: find out the workings of the array constructor (`Array("any value")`), because maybe it does something very similar. No need to have a dependency then if it's similar.
 */
export const makeArray = <T extends unknown>(
  ...arrayOrNotArray: (T | T[] | undefined)[]
) => {
  return arrayOrNotArray
    .map((arrayOrNot) => {
      const array: T[] = arrayOrNot
        ? Array.isArray(arrayOrNot)
          ? arrayOrNot
          : [arrayOrNot]
        : [];

      return array;
    })
    .flat();
};

/**
 * takes any type T or an array of T and returns T or the first of the array (which is T)
 */
export const takeFirst = <T extends unknown>(arrayOrNot: T | T[]) => {
  return makeArray(arrayOrNot)[0];
};

/**
 * useful for cli's that only take strings. This creates an object from a string
 *
 * input: "x:a, y:b, z:c"
 * output: { x: "a", y: "b", z: "c" }
 *
 * TODO: would be nice if we can validate this string immediately using a JSON SCHEMA
 */
export const getObjectFromParamsString = (paramsString: string) =>
  mergeObjectsArray(
    paramsString
      .split(",")
      .map((x) => x.trim().split(":"))
      .map((pair) =>
        pair[0] && pair[1] ? { [pair[0].trim()]: pair[1] } : null,
      )
      .filter(notEmpty),
  );

/** sums all parameters in two objects together */
export const sumObjectParameters = <TObject extends { [key: string]: number }>(
  object1: TObject,
  object2: TObject,
): TObject => {
  const objectKeys: (keyof TObject)[] = Object.keys(object1);
  const summedObject = mergeObjectsArray(
    objectKeys.map((key) => {
      const summedObjectPart = { [key]: object1[key] + object2[key] };

      return summedObjectPart;
    }),
  ) as TObject;
  // NB: too bad we still need `as TObject` here. I would love to learn how to prevent that

  return summedObject;
};

/**
 * sums all keys of an array of objects, assuming the objects have the same datastructure and assuming the values contain either numbers or undefined
 */
export const sumAllKeys = <T extends { [key: string]: number | undefined }>(
  objectArray: T[],
  keys: (keyof T)[],
): T => {
  const sumObject = objectArray.reduce(
    (total, item) => {
      // NB: not needed normally, but there seems to be some corrupt data here and there
      if (!item) return total;
      const newTotal = mergeObjectsArray(
        keys.map((key) => {
          const value1: number = total ? total[key] || 0 : 0;
          const value2: number = item?.[key] || 0;

          const sum =
            (!total || total[key] === undefined) && item[key] === undefined
              ? undefined
              : value1 + value2;

          return { [key]: sum };
        }),
      ) as T;

      return newTotal;
    },
    null as null | T,
  ) as T;

  return sumObject;
};

/**
 * Removes empty values (null or undefined) from your arrays in a type-safe way
 */
export function notEmpty<TValue extends unknown>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}
