import path from "node:path";
import { findOperationBasePath } from "./get-path/findOperationBasePath.js";
import { writeJsonToFile, writeStringToFile } from "./fs-util/files.js";
/**
 * Writes anything (string or json) the assets folder of the operation of the caller function of this function
 *
 * Useful for testing
 */
export const writeToAssets = async (
/**
 * Insert `__filename` here or the typescript file path
 *
```
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
```
 */
sourceFilePath, 
/**
 * The data you want to write to a file, can also be a promise
 */
data, assetsFileName, hideLog) => {
    // NB: it may be a promise, so first await it
    const realData = await data;
    const operationBasePath = findOperationBasePath(sourceFilePath);
    if (!operationBasePath)
        return;
    const extension = typeof realData === "string" ? ".md" : ".json";
    const realAssetsFileName = assetsFileName || `${path.parse(sourceFilePath).name}${extension}`;
    const assetsFilePath = path.join(operationBasePath, "assets", realAssetsFileName);
    if (!hideLog) {
        console.log({ assetsFilePath });
    }
    if (typeof data === "string") {
        return writeStringToFile(assetsFilePath, realData);
    }
    return writeJsonToFile(assetsFilePath, realData);
};
//# sourceMappingURL=writeToAssets.js.map