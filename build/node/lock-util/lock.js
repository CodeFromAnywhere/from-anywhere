import path from "node:path";
import { lockfileSuffix } from "./constants.js";
import { maximumLockTime } from "./constants.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { getUpdatedTimeObject } from "../../types/index.js";
/**
 * either creates the lockfile if it didn't exist or it will update it with new updatedAt and status. If status isn't set, status will be removed
 */
export const lock = async (aboluteLockableFilePath, message, functionName, parameters) => {
    const parsedPath = path.parse(aboluteLockableFilePath);
    const lockFilePath = path.join(parsedPath.dir, `${parsedPath.name}${lockfileSuffix}`);
    await writeJsonToFile(lockFilePath, {
        ...getUpdatedTimeObject(),
        status: "busy",
        functionName: functionName || "lock",
        parameters,
        message,
        cleanupAt: Date.now() + maximumLockTime,
    });
};
//# sourceMappingURL=lock.js.map