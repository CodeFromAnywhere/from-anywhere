/**
 * utility function to get a parameter inside of a nested object
 */
export const getParameterAtLocation = (object, location) => {
    const firstParameter = object[location[0]];
    if (location.length === 1)
        return firstParameter;
    return getParameterAtLocation(firstParameter, location.slice(1));
};
//# sourceMappingURL=getParameterAtLocation.js.map