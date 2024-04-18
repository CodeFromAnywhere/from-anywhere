import { trimSlashes } from "../../trimSlashes.js";
/**
 * NB: I already have this somewhere else but couldn't find it!
 *
 * If the path is /a/random/path
 *
 * The result of this function will be:
 *
 * ['/a', '/a/random', '/a/random/path']
 *
 * Can also be a relative path, but then there will be a slash prepended, so not optimal.
 */
export const getAllFoldersUntilFolder = (folderPath) => {
    const chunks = trimSlashes(folderPath).split("/");
    // chunks = ['a', 'random', 'path']
    const result = chunks.map((_, index, array) => {
        return "/" + array.slice(0, index + 1).join("/");
    });
    result.unshift("/");
    return result;
};
//# sourceMappingURL=getAllFoldersUntilFolder.js.map