import { tryParseJson } from "../../tryParseJson.js";
import { hasDependency } from "./hasDependency.js";
import { isOperation } from "./isOperation.js";
import path from "node:path";
import fs from "node:fs";
import { readJsonFileSync } from "../fs-util/readJsonFile.js";
export const packageCompilesTs = (packageJson) => {
    return (!!packageJson?.main &&
        packageJson.main.startsWith("src/") &&
        (packageJson.main.endsWith(".ts") || packageJson.main.endsWith(".tsx")));
};
export const tsconfigCompilesEsm = (tsconfig) => {
    return (!!tsconfig.compilerOptions.module &&
        !!tsconfig.compilerOptions.moduleResolution &&
        // @ts-ignore
        tsconfig.compilerOptions.module !== "esnext");
};
export const isUiOperation = (tsconfig, packageJson) => {
    const isReactPackage = !!packageJson &&
        (hasDependency(packageJson, "react") ||
            hasDependency(packageJson, "react-native") ||
            hasDependency(packageJson, "next") ||
            hasDependency(packageJson, "expo"));
    const usesJsx = !!tsconfig?.compilerOptions?.jsx;
    return isReactPackage && usesJsx;
};
/**
 * Returns `OperationClassification` if it's an operation, or undefined if it's not
 *
 * NB: don't confuse this with `ImportClassification`
 */
export const getOperationClassification = (folderPath) => {
    if (folderPath === undefined) {
        console.log("Incorrect type at getOperationClassification");
        process.exit(1);
    }
    if (!isOperation(folderPath)) {
        return;
    }
    const packageJsonPath = path.join(folderPath, "package.json");
    const packageJson = tryParseJson(fs.readFileSync(packageJsonPath, "utf8"));
    const tsconfigPath = path.join(folderPath, "tsconfig.json");
    const tsconfig = readJsonFileSync(tsconfigPath);
    if (!tsconfig)
        return;
    if (!packageJson || packageJson.workspaces) {
        return;
    }
    const nextConfigPath = path.join(folderPath, "next.config.js");
    const existsNextConfig = fs.existsSync(nextConfigPath);
    const isNextApp = existsNextConfig;
    if (isNextApp) {
        return "ui-web";
    }
    const appJsonPath = path.join(folderPath, "app.json");
    const existsAppJson = fs.existsSync(appJsonPath);
    const isReactNativeApp = existsAppJson;
    if (isReactNativeApp) {
        return "ui-app";
    }
    const isTs = packageCompilesTs(packageJson);
    const isEsm = tsconfigCompilesEsm(tsconfig);
    const isUi = isUiOperation(tsconfig, packageJson);
    const compileType = isEsm ? "esm" : isTs ? "ts" : "cjs";
    if (isUi) {
        return `ui-${compileType}`;
    }
    const hasTypesNode = hasDependency(packageJson, "@types/node");
    if (hasTypesNode) {
        if (packageJson.operation?.isNodeServer) {
            return "server-cjs";
        }
        return `node-${compileType}`;
    }
    return compileType;
};
//# sourceMappingURL=getOperationClassification.js.map