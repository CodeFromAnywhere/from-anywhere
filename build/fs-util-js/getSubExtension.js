/**
 * Provide a filename including its extension, to get the subextension.
 */
export const getSubExtension = (filename) => {
    const parts = filename.split(".");
    //removes extension
    parts.pop();
    //returns extension that's left (the sub-extension)
    const subExtension = parts.pop();
    return subExtension;
};
//# sourceMappingURL=getSubExtension.js.map