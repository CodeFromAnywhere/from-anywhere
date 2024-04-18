export const getFolderJs = (filePath) => {
    if (filePath === undefined)
        return undefined;
    const chunks = filePath.split("/");
    chunks.pop();
    const allWithoutFile = chunks.join("/");
    return allWithoutFile;
};
export const getFileOrFolderName = (fileOrFolderPath) => {
    if (!fileOrFolderPath)
        return undefined;
    const last = fileOrFolderPath.split("/").pop();
    return last;
};
export const isPathRelative = (path) => path.startsWith("./") || path.startsWith("../");
export const removeTrailingSlash = (p) => p.charAt(0) === "/" ? p.slice(1) : p;
/**
 * removes extension from the filename
 *
 */
export const withoutExtension = (fileName) => {
    const pieces = fileName.split(".");
    pieces.pop();
    return pieces.join(".");
};
/**
 * returns the extension of the filename or path WITHOUT dot
 *
 * NB: not sure, but could be nice to replace this with path.extname(pathString)
 */
export const getExtension = (fileNameOrPath) => {
    const pieces = fileNameOrPath.split(".");
    return pieces.pop();
};
//# sourceMappingURL=js.js.map