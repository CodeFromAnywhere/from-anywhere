import { getObjectKeysArray } from "./getObjectKeysArray.js";
import { mergeObjectsArray } from "./mergeObjectsArray.js";
import { NestedPartial } from "./NestedPartial.js";
import { O } from "./types/O.js";
export type IsOptional<T> = T extends undefined ? true : false;

// type X = IsOptional<string|undefined>;

/**

Merges an object into an object, ensuring typesafety. The second object needs to be a recursive subset of the first.

LIMITATION: When you set a value to undefined, ensure that it is allowed by the original object, we are not checking for this!

TODO: is it possible to remove this type unsafety? It would be nice to only be able to set it to undefined if that is allowed by T. Not sure if it's possible to check the difference bewteen a key not being present and a key being present and the value being undefined... Look it up!

Example:


```ts

  const testObject: {
    a: string;
    b: number;
    c: { x: string; y: number; z: { a: string; b: number; c: { x: "wow" } } };
  } = {
    a: "lol",
    b: 8,
    c: { x: "lol", y: 88, z: { a: "wow", b: 888, c: { x: "wow" } } },
  };

  const result = mergeNestedObject(testObject, {
    c: { z: { c: { x: undefined }, b: 999 } },
  });

  console.dir({ testObject, result }, { depth: 10 });

  // result will be: { a: 'lol', b: 8, c: { x: 'lol', y: 88, z: { a: 'wow', b: 999, c: { x: undefined } } }
  }

  ```

  It's great, because you can't make any type mistakes, and your code becomes much shorter for altering an object

 */
export const mergeNestedObject = <T extends O>(
  object: T,
  otherObject: NestedPartial<T> | undefined,
): T => {
  if (object === undefined && otherObject !== undefined) {
    // basecase that is used if the original object has some optional value undefined. in that case, the otherObject is used to set that key
    return otherObject as T;
  }
  if (otherObject === undefined) return object;
  // put `otherObject` on object, make sure

  // const withoutUndefinedOtherObject = omitUndefinedValues(otherObject);
  const partialNewObject = mergeObjectsArray(
    // go over all keys in otherObject...
    getObjectKeysArray(otherObject).map((key) => {
      // get the value for it
      const otherObjectValue = otherObject[key];

      //   if it's defined, but not an object.. the value is definite.
      // NB: arrays are also objects, but in this case they should also return
      if (
        typeof otherObjectValue !== "object" ||
        Array.isArray(otherObjectValue)
      ) {
        return { [key]: otherObject[key] };
      }

      //   if it's defined and its type is an object, that object needs to be merged with the full object
      const newValue = mergeNestedObject(object[key], otherObject[key]);

      return { [key]: newValue };
    }),
  ) as T;

  //   ensure to merge the result with the original object to also do the first level
  return { ...object, ...partialNewObject };
};

type NestedPartial2<T> =
  | {
      [TKey in keyof T]?: T[TKey] extends O
        ? NestedPartial2<T[TKey]> | null | undefined
        : T[TKey] | undefined;
    }
  | undefined;

/**
   * Set a value inside a nested object more easily. Same as `mergeNestedObject` but works for setting a value intead of merging it

Example:
```
const x = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          "Investor Name": { type: "string" },
          "Fund Type": { type: "string" },
          "Fund Stage": { type: "string" },
          "Website (if available)": { type: "string" },
          "Fund Focus (Sectors)": { type: "string" },
          "Partner Name": { type: "string" },
          "Partner Email": { type: "string" },
          "Portfolio Companies": { type: "string" },
          Location: { type: "string" },
          "Twitter Link": { type: "string" },
          "LinkedIn Link": { type: "string" },
          "Facebook Link": { type: "string" },
          "Number of Investments": { type: "string" },
          "Number of Exits": { type: "string" },
          "Fund Description": { type: "string" },
          "Founding Year": { type: "string" },
        },
      },
    },
    $schema: { type: "string" },
  },
};

const newStuff = { a: { type: "string" } };
const newSchema = setNestedObject(
  x,
  {
    properties: { items: { items: { properties: null } } },
  },
  newStuff,
);
console.log({ newSchema });
```
   */
export const setNestedObject = <T extends O>(
  object: T,
  otherObject: NestedPartial2<T>,
  value: any,
): T => {
  if (object === undefined && otherObject !== undefined) {
    // basecase that is used if the original object has some optional value undefined. in that case, the otherObject is used to set that key
    return otherObject as T;
  }
  if (otherObject === undefined) return object;
  // put `otherObject` on object, make sure

  // const withoutUndefinedOtherObject = omitUndefinedValues(otherObject);
  const partialNewObject = mergeObjectsArray(
    // go over all keys in otherObject...
    getObjectKeysArray(otherObject).map((key) => {
      // get the value for it
      const otherObjectValue = otherObject[key];

      // if it's defined, but not an object.. the value is definite.
      // NB: arrays are also objects, but in this case they should also return
      if (otherObjectValue === null) {
        return { [key]: value };
      }

      //   if it's defined and its type is an object, that object needs to be merged with the full object
      const newValue = setNestedObject(object[key], otherObject[key], value);

      return { [key]: newValue };
    }),
  ) as T;

  //   ensure to merge the result with the original object to also do the first level
  return { ...object, ...partialNewObject };
};
