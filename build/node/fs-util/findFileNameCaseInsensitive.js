import { fs } from "./fs.js";
import { path } from "./path.js";
/**
 * returns a path of a fileName
 */
export const findFileNameCaseInsensitive = async (folderPath, 
/**
 * fileName with extension
 */
fileName) => {
    if (!fs.existsSync(folderPath))
        return;
    const results = await fs.readdir(folderPath);
    const foundPath = results
        .map((fileName) => {
        const absolutePath = path.join(folderPath, fileName);
        return absolutePath;
    })
        .find((absolutePath) => {
        const parsedPath = path.parse(absolutePath);
        const isMatchCaseInsensitive = parsedPath.base.toLowerCase() === fileName.toLowerCase();
        return isMatchCaseInsensitive;
    });
    return foundPath;
};
//# sourceMappingURL=findFileNameCaseInsensitive.js.map