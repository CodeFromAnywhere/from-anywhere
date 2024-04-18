import { omitUndefinedValues } from "./omitUndefinedValues.js";
export const removeOptionalKeysFromObjectStrings = (object, keys) => {
    const newObject = keys.reduce((objectNow, key) => {
        return {
            ...objectNow,
            [key]: undefined,
        };
    }, object);
    return omitUndefinedValues(newObject);
};
export const removeOptionalKeysFromObject = (object, keys) => {
    return removeOptionalKeysFromObjectStrings(object, keys);
};
//# sourceMappingURL=removeOptionalKeysFromObject.js.map