import fs from "node:fs";

import { getProjectRoot } from "./getProjectRoot.js";
import { getRootPath } from "./getRootPath.js";
/**
 * returns an array of all (absolute) paths containing operations
 *
 * for a bundled project, that means /apps, /packages, /modules
 *
 * for the OS project, that means /operations/tools and /operations/niches
 */
export const getPathsWithOperations = (config?: {
  /**
   * if given, this will be taken as the project root instead of the one that can be found automatically (useful for bundling or working with multiple projects that alter each other)
   */
  manualProjectRoot?: string;
}): string[] => {
  const rootPath = config?.manualProjectRoot || getProjectRoot();

  if (!rootPath) {
    console.log(`no rootpath found!`, { type: "error" });
    process.exit(1);
  }

  const operationsPath = getRootPath("packages");
  if (!operationsPath || !fs.existsSync(operationsPath)) {
    console.log(`Couldn't find tools or bundles folder in ${rootPath}`);
    process.exit(1);
  }

  return [operationsPath];
};
