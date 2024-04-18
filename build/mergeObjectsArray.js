/**
 * TODO: find a way to return the correct type interface
 */
export const mergeObjectsArray = (objectsArray) => {
    const result = objectsArray.reduce((previous, current) => {
        return { ...previous, ...current };
    }, {});
    return result;
};
//# sourceMappingURL=mergeObjectsArray.js.map