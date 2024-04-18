export const tryJsonStringify = (data) => {
    try {
        return JSON.stringify(data, null, 2);
    }
    catch (e) {
        return;
    }
};
//# sourceMappingURL=tryJsonStringify.js.map