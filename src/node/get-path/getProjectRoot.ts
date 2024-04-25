import fs from "node:fs";
import path from "node:path";

import { findFolderWhereMatch } from "./findFolderWhereMatch.js";

const hasProjectRootFile = (absolutePath: string) => {
  const osRootFilePath = path.join(absolutePath, ".project-root");
  const osRootFileExists = fs.existsSync(osRootFilePath);
  return osRootFileExists;
};

/**
 * returns project root folder path
 *
 * recursive. goes up until it finds a folder that's the project root
 *
 * if no source path is given, uses the directory name where the function is executed from as a starting point
 *
 * Super dumb! Should be known and cached in memory, globally, somehow.
 */
export const getProjectRoot = (fullSourcePath?: string): string => {
  const matchFolder = findFolderWhereMatch(
    fullSourcePath || process.cwd(),
    hasProjectRootFile,
  );
  if (!matchFolder) {
    // throw new Error("No .project-root file found", {
    //   cause: "no-project-root",
    // });
    return "";
  }
  return matchFolder.folderPath;
};

/** NB: This is the projectRoot directly cached! */
export const projectRoot = getProjectRoot();
