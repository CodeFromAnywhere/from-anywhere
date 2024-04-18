import path from "node:path";
import { readJsonFile } from "./readJsonFile.js";
export const readProjectRelativeJsonFile = async (projectRelativePath, projectRoot) => {
    if (!projectRoot)
        return null;
    const fullPath = path.join(projectRoot, projectRelativePath);
    return readJsonFile(fullPath);
};
//# sourceMappingURL=readProjectRelativeJsonFile.js.map