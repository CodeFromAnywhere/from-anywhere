/**
 * returns a file id (path without extension) relative to the src folder of an operation
 *
 * e.g. "general" for src/general.ts
 *
 * NB: assumes all src is in the src folder
 *
 * NB: removes "/" in the beginning, if found
 */
export const getSrcRelativeFileId = (operationRelativePath) => {
    const srcRelativePath = operationRelativePath.replace("src/", "");
    const parts = srcRelativePath.split(".");
    // remove the last one
    parts.pop();
    const srcRelativeFileId = parts.join(".");
    const finalId = srcRelativeFileId.startsWith("/")
        ? srcRelativeFileId.substring(1)
        : srcRelativeFileId;
    return finalId;
};
//# sourceMappingURL=getSrcRelativeFileId.js.map