export const isArrayEqual = (a, b) => {
    return (Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]));
};
//# sourceMappingURL=isArrayEqual.js.map