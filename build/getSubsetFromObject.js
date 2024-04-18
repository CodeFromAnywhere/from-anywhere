/**
 * takes an object and a subset of its keys and returns a subset of that object
 *
 * input: { x: "a", y: "b", z: "c" } and ["x"]
 *
 * output: { x: "a" }
 */
export const getSubsetFromObject = (object, keys) => {
    const subsetObject = keys.reduce((obj, key) => {
        return { ...obj, [key]: object[key] };
    }, {});
    return subsetObject;
};
//const result = getSubsetFromObject({a:"hi",b:9,c:true}, ["a"])
//# sourceMappingURL=getSubsetFromObject.js.map