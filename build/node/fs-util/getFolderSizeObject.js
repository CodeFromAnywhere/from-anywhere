import { fs } from "./fs.js";
import { path } from "./path.js";
import { generatedFolders } from "../../filename-conventions/index.js";
import { notEmpty, sum } from "../../general.js";
/**
 * returns an object with all sizes of all folders and files, recursively
 */
export const getFolderSizeObject = async (absoluteFolderPath, 
/**
 * Folders smaller than this won't provide details
 */
minimumReportSizeMb = 0, ignoreGenerated = true) => {
    const files = await fs.readdir(absoluteFolderPath, { withFileTypes: true });
    const paths = (await Promise.all(files.map(async (file) => {
        const newPath = path.join(absoluteFolderPath, file.name);
        if (file.isDirectory()) {
            if (ignoreGenerated &&
                [...generatedFolders, "public"].includes(file.name))
                return;
            const children = await getFolderSizeObject(newPath);
            const size = sum(children.map((x) => x.size));
            return {
                name: file.name,
                size,
                /**
                 *
                 */
                children: size > minimumReportSizeMb * 1024 * 1024 ? children : undefined,
            };
        }
        if (file.isFile()) {
            const { size } = await fs.stat(newPath);
            return {
                size,
                children: undefined,
                name: file.name,
            };
        }
        return minimumReportSizeMb
            ? undefined
            : { size: 0, children: undefined, name: file.name };
    }))).filter(notEmpty);
    return paths;
};
getFolderSizeObject.config = {
    isPublic: true,
};
//# sourceMappingURL=getFolderSizeObject.js.map