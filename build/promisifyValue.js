/**
 * Nice helper for async reducers!!
 */
export const promisifyValue = (value) => {
    const promise = new Promise((resolve) => resolve(value));
    return promise;
};
//# sourceMappingURL=promisifyValue.js.map