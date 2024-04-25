import { findOperationBasePath } from "./findOperationBasePath.js";
import { getOperationPathParse } from "./getOperationPathParse.js";
import { kebabCase } from "../../convert-case.js";
import { generateId } from "../../generateRandomString.js";
export const getIndexId = async (filePath, name) => {
    const operationPathParse = getOperationPathParse(filePath);
    if (!operationPathParse)
        return;
    const operationBasePath = findOperationBasePath(filePath);
    if (!operationBasePath)
        return;
    const { operationRelativeTypescriptFilePath, relativePathFromProjectRoot } = operationPathParse;
    // TODO: not sure if the projectRelativepath is correc,t that is probably needs to be a path to the db file!
    const tsIndexModelType = {
        operationName: operationPathParse.operationName || null,
        operationRelativeTypescriptFilePath,
        // TODO: FIX
        projectRelativePath: relativePathFromProjectRoot,
        // operationName: "",
        // operationRelativePath: "",
        // projectRelativePath: "",
        // operationRelativeTypescriptFilePath: "",
        // srcFileId: "",
        id: generateId(),
        name,
        slug: kebabCase(name),
    };
    return tsIndexModelType;
};
//# sourceMappingURL=getIndexId.js.map