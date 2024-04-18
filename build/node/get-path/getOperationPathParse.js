import { getProjectRoot } from "./getProjectRoot.js";
import { findOperationBasePath } from "./findOperationBasePath.js";
import { getPathParse } from "./getPathParse.js";
import { getOperationRelativePath } from "./getOperationRelativePath.js";
import path from "node:path";
import { getLastFolder } from "../fs-util/js.js";
import { readJsonFileSync } from "../fs-util/readJsonFile.js";
import { makeRelative } from "../../fs-util-js/makeRelative.js";
/**
 * get all operation-related path information that can be inferred from the path
 *
 * NB: currently it also looks up the operation name from its packagejson
 */
export const getOperationPathParse = (absolutePath) => {
    if (!absolutePath)
        return;
    const pathParse = getPathParse(absolutePath);
    if (!pathParse)
        return;
    const projectRoot = getProjectRoot(absolutePath);
    if (!projectRoot)
        return;
    const operationBasePath = findOperationBasePath(absolutePath);
    if (!operationBasePath)
        return;
    const operationSrcPath = path.join(operationBasePath, "src");
    const operationFolderName = getLastFolder(operationBasePath);
    const operationName = readJsonFileSync(path.join(operationBasePath, "package.json"))?.name;
    const operationRelativeTypescriptFilePath = getOperationRelativePath(absolutePath, operationBasePath);
    const parsedPath = path.parse(absolutePath);
    const srcFileId = makeRelative(path.join(parsedPath.dir, parsedPath.name), operationSrcPath);
    const relativeOperationBasePathFromProjectRoot = operationBasePath.slice(projectRoot.length);
    return {
        relativePathFromProjectRoot: pathParse.relativePathFromProjectRoot,
        srcFileId,
        operationFolderName,
        operationRelativeTypescriptFilePath,
        relativeOperationBasePathFromProjectRoot,
        operationName,
    };
};
//# sourceMappingURL=getOperationPathParse.js.map