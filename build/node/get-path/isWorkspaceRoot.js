import path from "node:path";
import fs from "node:fs";
import { tryParseJson } from "from-anywhere";
/**
 * simple sync function to check if a folder is the root of a workspace (not operation but a workspace)
 */
export const isWorkspaceRoot = (folderPath) => {
    const packageJsonPath = path.join(folderPath, "package.json");
    const existsPackageJson = fs.existsSync(packageJsonPath);
    if (!existsPackageJson)
        return;
    const packageJson = tryParseJson(fs.readFileSync(packageJsonPath, "utf8"));
    if (!packageJson || !packageJson.workspaces) {
        return;
    }
    return {
        isBundle: packageJson.operation?.isBundle || false,
        isWorkspaceRoot: true,
    };
};
//# sourceMappingURL=isWorkspaceRoot.js.map