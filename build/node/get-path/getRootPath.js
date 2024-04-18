import path from "node:path";
import { getProjectRoot } from "./getProjectRoot.js";
import { databaseFolderName } from "../../filename-conventions/filename-conventions.js";
/**
 * can only be accessed in the OS
 */
export const osRootFoldersConst = [
    "assets",
    "backups",
    "bundled",
    "cloned",
    "distributions",
    "memory",
];
/**
 * can be accessed in projects as well as in the OS
 */
export const projectRootFoldersConst = [
    "packages",
    databaseFolderName,
];
export const projectRootFolders = [...projectRootFoldersConst];
export const osRootFolders = [...osRootFoldersConst];
/*
Gets project path, or a folder in the root that is convention
*/
export const getRootPath = (
/**
 * if not specified, will return project root path
 */
name, config) => {
    const projectRootDir = config?.manualProjectRoot || getProjectRoot();
    if (!projectRootDir)
        return;
    if (!name) {
        return projectRootDir;
    }
    // non-bundled projects
    if (!projectRootFolders.concat(osRootFolders).includes(name)) {
        console.log("getRootPath: Should never happen, probably a wrong input was provided:", { name });
        return;
    }
    const folderPath = path.resolve(projectRootDir, name);
    return folderPath;
};
//# sourceMappingURL=getRootPath.js.map