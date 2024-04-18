import { fs } from "./fs.js";
import { path } from "./path.js";
/**
 * Finds the number at the end of a filename and increases it
 * If there is no number yet, concatenates '1' to a string
 *
 * E.g.
 *
 * - `hello-world` becomes `hello-world1`
 * - `hello36` becomes `hello37`
 */
export const oneUp = (filename) => {
    const lastNumber = filename.match(/\d+$/)?.[0];
    const newNumber = lastNumber ? String(Number(lastNumber) + 1) : "1";
    return `${filename.slice(0, filename.length - (lastNumber?.length || 0))}${newNumber}`;
};
export const getFirstAvailableFilename = (absoluteFilePath) => {
    // If that doesn't exist, use that
    if (!fs.existsSync(absoluteFilePath)) {
        return absoluteFilePath;
    }
    const parsedPath = path.parse(absoluteFilePath);
    const newFilename = `${oneUp(parsedPath.name)}${parsedPath.ext}`;
    const newProposedPath = path.join(parsedPath.dir, newFilename);
    return getFirstAvailableFilename(newProposedPath);
};
//# sourceMappingURL=getFirstAvailableFilename.js.map