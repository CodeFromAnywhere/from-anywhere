import fs from "node:fs";
const fsPromises = fs.promises;
import { readJsonFileSync } from "../fs-util/readJsonFile.js";
import { getActionStatusFilePath } from "./getActionStatusFilePath.js";
export const isLocked = (absolutePath) => {
    const actionStatusFilePath = getActionStatusFilePath(absolutePath);
    if (fs.existsSync(actionStatusFilePath)) {
        const lock = readJsonFileSync(actionStatusFilePath);
        if (!lock) {
            //definitely no lockfile
            return false;
        }
        if (lock.cleanupAt && Date.now() >= lock.cleanupAt) {
            fsPromises.rm(actionStatusFilePath);
            return false;
        }
        // there's a lockfile not to be cleaned up yet
        if (lock.updatedAt) {
            // status has recently enough been updated
            return true;
        }
        return false;
    }
    return false;
};
//# sourceMappingURL=isLocked.js.map