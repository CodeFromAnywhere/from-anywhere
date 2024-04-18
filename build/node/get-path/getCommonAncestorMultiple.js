import path from "node:path";
import fsPromises from "node:fs/promises";
import fs from "node:fs";
import { getAllFoldersUntilFolder } from "../fs-util/index.js";
export const getFolderPath = async (fileOrFolderPath) => {
    if (!fs.existsSync(fileOrFolderPath)) {
        return;
    }
    const stat = await fsPromises.stat(fileOrFolderPath);
    if (stat.isDirectory())
        return fileOrFolderPath;
    return path.parse(fileOrFolderPath).dir;
};
export const getCommonAncestorMultiple = async (paths) => {
    if (paths.length <= 1) {
        console.log("not enough paths, minimum 2");
        return;
    }
    const firstPath = paths[0];
    const allFolders = getAllFoldersUntilFolder(firstPath);
    const uncommonIndex = allFolders.findIndex((pathUntilFolder) => {
        // NB: find a path that doesn't start with a chunk
        const isUncommon = !!paths.find((p) => !p.startsWith(pathUntilFolder === "/" ? "/" : `${pathUntilFolder}/`));
        return isUncommon;
    });
    console.log({ paths, firstPath, allFolders, uncommonIndex });
    if (uncommonIndex === -1) {
        return getFolderPath(firstPath);
    }
    const commonAncestor = await getFolderPath(allFolders[uncommonIndex - 1]);
    return commonAncestor;
};
//# sourceMappingURL=getCommonAncestorMultiple.js.map