import { findAllPackages } from "./findAllPackages.js";
import fs from "node:fs";
import path from "node:path";
const fsPromises = fs.promises;
import { findFolderWhereMatch } from "../get-path/findFolderWhereMatch.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";
/**
 * Finds any operations that are in scope of any path. Will do so by looking for package.json's. First down, then up from the first folder it found.
 *
 * Efficient!
 */
export const findOperationsInScope = async (absolutePath) => {
    //console.log({ absolutePath });
    if (!absolutePath || absolutePath === "/") {
        // NB: Completely fokt
        return undefined;
    }
    const folderPath = path.parse(absolutePath).dir;
    if (!fs.existsSync(absolutePath)) {
        // NB: If the path didn't exist, go one folder up, to check if it exists
        return findOperationsInScope(folderPath);
    }
    if (!(await fsPromises.stat(absolutePath)).isDirectory()) {
        // NB: If the path is a file or symlink, go one folder up
        return findOperationsInScope(folderPath);
    }
    // NB: AbsolutePath is a folder
    const firstPackageFolderPath = findFolderWhereMatch(absolutePath, (p) => fs.existsSync(path.join(p, "package.json")))?.folderPath;
    if (!firstPackageFolderPath) {
        // no package all the way up, not even the root workspace
        return;
    }
    const packageJson = await readJsonFile(path.join(firstPackageFolderPath, "package.json"));
    if (!packageJson) {
        // shouldn't happen but still neeed to return due to error
        return;
    }
    const isWorkspace = !!packageJson.workspaces;
    if (!isWorkspace) {
        // NB: it's not a workspace so this is the only package.json in scope here.
        return [firstPackageFolderPath];
    }
    // NB: it's the workspace! This means we need to go up instead because we didn't find a package, so it must be in a folder upwards of `absolutePath` (which is the first folder we encountered)
    const packageFolderPaths = (await findAllPackages({ basePath: absolutePath })).map((x) => path.parse(x.path).dir);
    return packageFolderPaths;
};
//# sourceMappingURL=findOperationsInScope.js.map