import { explore } from "./explore.js";
/**
 * Ignored:"index.ts", "build", "db", "node_modules", "data", "assets",
 *
 * Ignored suffix: ".d.ts"
 *
 */
export const getFolderTypescriptFiles = async (
  folderPath: string,
  includeStats: boolean,
) => {
  return explore({
    basePath: folderPath,
    includeStats,
    extension: ["ts", "tsx"],
    ignoreSuffix: [".d.ts"],
    ignore: ["index.ts", "build", "db", "node_modules", "data", "assets"],
  });
};
