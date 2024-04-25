import path from "node:path";
import { lockfileSuffix } from "./constants.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { getUpdatedTimeObject } from "../../types/index.js";
/**
 * lock a file with a given error message
 */
export const lockError = async (aboluteLockableFilePath, errorMessage, 
/**
 * Defaults to never
 */
cleanupAt, functionName, parameters) => {
    const parsedPath = path.parse(aboluteLockableFilePath);
    const lockFilePath = path.join(parsedPath.dir, `${parsedPath.name}${lockfileSuffix}`);
    await writeJsonToFile(lockFilePath, {
        ...getUpdatedTimeObject(),
        status: "error",
        functionName: functionName || "lockError",
        parameters,
        message: errorMessage,
        cleanupAt,
    });
};
//# sourceMappingURL=lockError.js.map