import { O } from "./O.js";
import { omitUndefinedValues } from "./omitUndefinedValues.js";
import { OptionalKeys } from "./types.js";
export const removeOptionalKeysFromObjectStrings = <TObject extends O>(
  object: TObject,
  keys: string[],
): TObject => {
  const newObject = keys.reduce((objectNow, key) => {
    return {
      ...objectNow,
      [key]: undefined,
    };
  }, object);
  return omitUndefinedValues(newObject);
};

export const removeOptionalKeysFromObject = <TObject extends O>(
  object: TObject,
  keys: OptionalKeys<TObject>[],
): TObject => {
  return removeOptionalKeysFromObjectStrings(object, keys);
};
