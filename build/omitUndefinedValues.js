export const omitUndefinedValues = (object) => {
    Object.keys(object).map((key) => {
        const value = object[key];
        if (value === undefined) {
            delete object[key];
        }
    });
    return object;
};
//# sourceMappingURL=omitUndefinedValues.js.map