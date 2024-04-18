import { frontendOptionalFileSubExtensions } from "./filename-conventions.js";
import { operationUnindexableNamesOrSubExtensions } from "./filename-conventions.js";
import { hasSpecificSubExtension } from "./hasSpecificSubExtension.js";
/**
 * Used to ensure the file can be put in the indexfile (things like .test and .cli should not)
 * Also used to determine what is in the index file and thus what should be in the SDK
 */
export const isIndexableFileId = (fileId) => {
    const isOperationName = hasSpecificSubExtension(fileId, operationUnindexableNamesOrSubExtensions, true);
    const isFrontendOptionalName = hasSpecificSubExtension(fileId, frontendOptionalFileSubExtensions, false);
    const isTypescriptDeclarationFile = hasSpecificSubExtension(fileId, ["d"], false);
    const isIndex = fileId === "index";
    const isIndexable = !isIndex &&
        !isTypescriptDeclarationFile &&
        !isFrontendOptionalName &&
        !isOperationName;
    return isIndexable;
};
//# sourceMappingURL=isIndexableFileId.js.map