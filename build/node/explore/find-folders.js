import { generatedFolders } from "../../filename-conventions/filename-conventions.js";
import { getProjectRoot } from "../get-path/getProjectRoot.js";
import { getRootPath } from "../get-path/getRootPath.js";
import { explore } from "./explore.js";
import { pathArrayIsOperation } from "./util.js";
export const findAllFoldersWithName = async (config) => {
    const { basePath, folderName, ignoreOperations, ignoreFolders } = config;
    const result = (await explore({
        basePath,
        searchLevel: "folder",
        search: folderName,
        ignore: [...generatedFolders, ...(ignoreFolders || [])],
        exact: true,
        cancelRecursionOn: ignoreOperations ? pathArrayIsOperation : undefined,
    })).map((x) => x.path);
    return result;
};
/**
 * Returns absolute paths for all docs folders (not the files inside)
 */
export const findAllDocsFolderPaths = async (
/**
 * Don't look for docs folders inside of operation folders
 */
ignoreOperations, 
/**
 * optionally, ignore some folders
 */
ignoreFolders) => {
    const projectRoot = getProjectRoot();
    if (!projectRoot)
        return [];
    const docsBasePath = getRootPath("packages");
    if (!docsBasePath)
        return [];
    const docsFolderPaths = await findAllFoldersWithName({
        basePath: docsBasePath,
        folderName: "docs",
        ignoreOperations,
        ignoreFolders,
    });
    return docsFolderPaths;
};
export const findAllTodoFolderPaths = (basePath, ignoreOperations) => {
    return findAllFoldersWithName({
        basePath,
        folderName: "todo",
        ignoreOperations,
    });
};
//# sourceMappingURL=find-folders.js.map