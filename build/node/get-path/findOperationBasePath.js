#!/usr/bin/env node
import { findFolderWhereMatch } from "./findFolderWhereMatch.js";
import { getOperationClassification } from "./getOperationClassification.js";
/**
 * recursive. goes up until it finds a folder that's an operation
 *
 * because it had to read the package.json anyway, it's returning the operation classification as well
 */
export const findOperationBasePathWithClassification = (startPath) => {
    // returns if `getOperationClassification` does not return `undefined`
    const result = findFolderWhereMatch(startPath, getOperationClassification);
    return result
        ? { folderPath: result.folderPath, classification: result.matchResult }
        : undefined;
};
export const findOperationBasePath = (startPath) => {
    return findOperationBasePathWithClassification(startPath)?.folderPath;
};
//# sourceMappingURL=findOperationBasePath.js.map