import { O } from "./types/O.js";
import { notEmpty } from "./general.js";
import { getObjectKeysArray } from "./getObjectKeysArray.js";
import { mergeObjectsArray } from "./mergeObjectsArray.js";
/**
 * Map an object asynchronously and return the same object with the mapped result in its values
 * 
 * Example usage:
 * 
 * 
```ts

  const srcFileContentObject = {
    "index.ts": indexString,
    "public-local.ts": publicLocalTypescriptFileString,
    "public.ts": publicTypescriptFileString,
  };

  const srcFileWriteSuccessObject = await objectMapAsync(srcFileContentObject, async (operationRelativeTypescriptFilePath,content)=>{

    try {
      await fs.writeFile(
        path.join(operationBasePath, "src", operationRelativeTypescriptFilePath),
        content,
        "utf8"
      );

      return true;
    
    } catch {
      return false;
    }

  });

```

 */
export const objectMapAsync = async <
  TObject extends { [key: string]: any },
  TResultValue,
  TResultObject extends {
    [key in keyof TObject]: TResultValue;
  },
>(
  object: TObject,
  mapFn: (
    key: Extract<keyof TObject, string>,
    value: TObject[keyof TObject],
  ) => Promise<TResultValue>,
): Promise<TResultObject> => {
  const keys = getObjectKeysArray(object);

  const result = mergeObjectsArray(
    await Promise.all(
      keys.map(async (key) => {
        const value = object[key];
        return { [key]: await mapFn(key, value) };
      }),
    ),
  ) as unknown as TResultObject;

  return result;
};

/**
 * maps over all values in an object and replaces them using a mapfn
 * 
 * Example usage:
 * 
 * ```ts
 * 
const result = objectMapSync({ hello: "world", isTrue: true }, (key,value) => {
  return `${value}123`;
});
```
 */

export const objectMapSync = <
  TObject extends { [key: string]: any },
  TMapResult,
  TResultObject extends { [key in keyof TObject]: TMapResult },
>(
  object: TObject,
  mapFn: (key: keyof TObject, value: TObject[keyof TObject]) => TMapResult,
): TResultObject => {
  const valueObjectParts = getObjectKeysArray(object).map((key) => {
    return { [key]: mapFn(key, object[key]) };
  });

  const merged = mergeObjectsArray(
    valueObjectParts,
  ) as unknown as TResultObject;

  return merged;
};

/**
 * not sure if this is the best way, but it does save some lines of code!
 *
 * maps over an object's values with a map function
 *
 * DEPRECATED in favour of objectMapSync and objectMapAsync
 */
export const objectValuesMap = <
  T extends { [key: string]: T[string] },
  U extends unknown,
>(
  object: T,
  mapFn: (key: string, value: T[string]) => U,
): { [key: string]: U } => {
  return Object.keys(object).reduce(function (result, key) {
    result[key] = mapFn(key, object[key]);
    return result;
  }, {} as any);
};

/**
 * maps over all values in an object and replaces them using a mapfn
 *
 * sync
 */
export const mapValuesSync = <T, U>(
  object: { [key: string]: T },
  mapFn: (value: T) => U,
) => {
  const valueObjectParts = Object.keys(object).map((key) => {
    return { [key]: mapFn(object[key]) };
  });

  return mergeObjectsArray(valueObjectParts);
};

/**
 * maps over all keys in an object and replaces them using a mapfn
 */
export const mapKeys = async (
  object: { [key: string]: any },
  mapFn: (key: string) => string | Promise<string> | undefined,
) => {
  const keyPairs = await Promise.all(
    Object.keys(object).map(async (oldKey) => {
      return { oldKey, newKey: await mapFn(oldKey) };
    }),
  );

  return mergeObjectsArray(
    keyPairs
      .map((pair) => {
        return pair.newKey ? { [pair.newKey]: object[pair.oldKey] } : null;
      })
      .filter(notEmpty),
  );
};

/** Turns an object mapped datastructure into a regular array  */
export const objectMapToArray = <T extends O, TKey extends string>(
  objectMap: { [key: string]: T } | undefined,
  /** If defined will use this as propterty, otherwise will just use "key" */
  keyPropertyName: TKey,
) => {
  const items = !objectMap
    ? []
    : Object.keys(objectMap).map((key) => {
        const keyName = keyPropertyName || "key";
        const keyObject = { [keyName]: key } as { [key in TKey]: string };

        const newItem = { ...keyObject, ...objectMap[key] };
        return newItem;
      });
  return items;
};

// const res = objectMapToArray(
//   { x: { name: "x", age: 23 }, y: { name: "y", age: 30 } },
//   "letter",
// );
