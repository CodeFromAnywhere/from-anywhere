import { fs } from "./fs.js";
import { getFolderJs } from "../../fs-util-js/index.js";
/**
 * Looks if the given path is a file or a folder, and goes a folder up in case it doesn't exist, to find a path that does.
 */
export const findClosestAbsolutePath = async (absolutePath) => {
    // NB: base-case
    if (absolutePath === "")
        return;
    const pathExists = fs.existsSync(absolutePath);
    const stats = pathExists ? await fs.stat(absolutePath) : null;
    const isFile = stats?.isFile();
    const isFolder = stats?.isDirectory();
    const isValidPath = pathExists && (isFile || isFolder);
    if (isValidPath)
        return absolutePath;
    // no valid path
    const folderUpPath = getFolderJs(absolutePath);
    return findClosestAbsolutePath(folderUpPath);
};
//# sourceMappingURL=findClosestAbsolutePath.js.map