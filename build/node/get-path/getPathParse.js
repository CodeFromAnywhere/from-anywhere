import { getProjectRoot } from "./getProjectRoot.js";
/**
 * gets all kinds of information that can be inferred from any path (file or folder).
 */
export const getPathParse = (absolutePath) => {
    const projectRoot = getProjectRoot(absolutePath);
    if (!projectRoot)
        return;
    const relativePathFromProjectRoot = absolutePath.slice(projectRoot.length);
    return { relativePathFromProjectRoot };
};
//# sourceMappingURL=getPathParse.js.map