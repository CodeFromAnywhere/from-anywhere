import { mergeObjectsArray } from "./mergeObjectsArray.js";
/**
 * Creates a `MappedObject` of an array of any type. `MappedObject`s are great for increasing efficiency to get an item from an array. Especially useful when finds are needed on a specific key match for huge arrays. Instead of finding on the array you can simply get the right property from this object.
 *
 * NB: Don't use this inside of render functions, it's a very slow function, the whole idea is that this makes it faster, so just do it once!
 */
export const createMappedObject = (array, 
/**
 Key to make the map from. Must be unique or it could be overwritten. Key must be a string
 */
mapKey, 
/**
 * If the result of the mapped object, based on the object should have mapped values, provide this mapfunction to get them.
 */
mapFn) => {
    const mappedObject = mergeObjectsArray(array.map((item) => {
        const key = item[mapKey];
        const value = mapFn ? mapFn(item, array) : item;
        return {
            [key]: value,
        };
    }));
    return mappedObject;
};
/**
 * Simpler mapped object creator that I need quite often!
 */
export const createMappedKeysObject = (keys, map) => {
    const result = mergeObjectsArray(keys.map((key) => ({ [key]: map(key) })));
    return result;
};
/**
 * Simpler mapped object creator that I need quite often!
 */
export const createPromisedMappedKeysObject = async (keys, map) => {
    const result = mergeObjectsArray(await Promise.all(keys.map(async (key) => ({ [key]: await map(key) }))));
    return result;
};
//# sourceMappingURL=createMappedObject.js.map