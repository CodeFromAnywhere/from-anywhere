import fs from "node:fs";
import path from "node:path";
/**
 * Checks whether or not an absolute path contains an operation. The only check it's doing is that the folder must contain both a package.json as well as a tsconfig.json
 */
export const isOperation = (absoluteFolderPath) => {
    const packageJsonPath = path.join(absoluteFolderPath, "package.json");
    const existsPackageJson = fs.existsSync(packageJsonPath);
    const tsConfigPath = path.join(absoluteFolderPath, "tsconfig.json");
    const existsTsConfig = fs.existsSync(tsConfigPath);
    // NB: must have these two in order to be an operation at all
    if (!existsPackageJson || !existsTsConfig) {
        return false;
    }
    return true;
};
//# sourceMappingURL=isOperation.js.map