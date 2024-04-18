import { tryParseJson } from "from-anywhere";
import { canRead, canReadSync } from "./files.js";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export const readJsonFile = async (filePath) => {
    if (!filePath)
        return null;
    // TODO: is this needed?
    if (!fs.existsSync(filePath))
        return null;
    const readable = await canRead(filePath);
    if (!readable)
        return null;
    const fileString = await fsPromises.readFile(filePath, "utf8");
    if (!fileString)
        return null;
    const parsed = tryParseJson(fileString);
    return parsed;
};
/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export const readJsonFileSync = (filePath) => {
    // TODO: is this needed?
    if (!fs.existsSync(filePath))
        return null;
    const readable = canReadSync(filePath);
    if (!readable)
        return null;
    const fileString = fs.readFileSync(filePath, "utf8");
    if (!fileString)
        return null;
    const parsed = tryParseJson(fileString);
    return parsed;
};
//# sourceMappingURL=readJsonFile.js.map