import { fs } from "./fs.js";
import { path } from "./path.js";
/**
recursively remove all folders onto absolutePath if they are empty.

The `absoluteDeletedPath` must be a file or folder path that was just deleted.
 */
export const removeEmptyFoldersRecursive = async (absoluteDeletedPath) => {
    // NB: one folder up
    const absoluteFolderPath = path.parse(absoluteDeletedPath).dir;
    if (!fs.existsSync(absoluteFolderPath)) {
        // Basecase: the folder doesn't exist
        return;
    }
    const names = await fs.readdir(absoluteFolderPath, "utf8");
    if (names.length > 0) {
        // Basecase: the folder is not empty
        return;
    }
    // console.log(`removing ${absoluteFolderPath}`);
    // The folder is empty. Remove the folder and only the folder (non-recursive, non-force)
    await fs.rm(absoluteFolderPath, { recursive: true, force: false });
    // Folder removed. Now go one folder up, and see if that has any files.
    return removeEmptyFoldersRecursive(absoluteFolderPath);
};
//# sourceMappingURL=removeEmptyFoldersRecursive.js.map