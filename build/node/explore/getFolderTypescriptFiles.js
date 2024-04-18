import { explore } from "./explore.js";
/**
 * Ignored:"index.ts", "build", "db", "node_modules", "data", "assets",
 *
 * Ignored suffix: ".d.ts"
 *
 */
export const getFolderTypescriptFiles = async (folderPath, includeStats) => {
    return explore({
        basePath: folderPath,
        includeStats,
        extension: ["ts", "tsx"],
        ignoreSuffix: [".d.ts"],
        ignore: ["index.ts", "build", "db", "node_modules", "data", "assets"],
    });
};
//# sourceMappingURL=getFolderTypescriptFiles.js.map