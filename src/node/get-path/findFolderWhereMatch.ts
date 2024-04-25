#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

/**
 * recursive. goes up a folder until it finds a package.json
 */
export const findFolderWhereMatch = <T>(
  fullSourcePath: string,
  /**
   * match must be truthy in order to match, and falsy if it's not a match
   *
   * the result of the matchFunction will be returned at the end of the recursion
   */
  matchFunction: (folderPath: string) => T,
): undefined | { folderPath: string; matchResult: T } => {
  if (fullSourcePath === undefined) {
    console.log("WTF");
    process.exit(1);
  }
  // Basecase to make sure that the provided sourcepath is valid
  if (!fs.existsSync(fullSourcePath)) {
    console.log(`full source path invalid ${fullSourcePath}`, {
      type: "debug",
    });
    return;
  }

  // Basecase to make sure that it doesn't go on infinitely, even if package.json doesn't exist anywhere
  if (fullSourcePath === "/") {
    // console.log(`folder was not found, went all the way to root '/'`, {
    //   type: "debug",
    // });
    return;
  }

  const matchResult = matchFunction(fullSourcePath);

  if (matchResult) return { folderPath: fullSourcePath, matchResult };

  return findFolderWhereMatch(path.join(fullSourcePath, ".."), matchFunction);
};
