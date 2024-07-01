import fs from "node:fs";
const fsPromises = fs.promises;
import { getActionStatusFilePath } from "./getActionStatusFilePath.js";
/**
 * Removes lockfile based on the filepath of the file that shoul've been locked
 * NB: don't provide the path to the lockfile but the path to the file that the lock should be removed from
 */
export const unlock = (absoluteLockedFilePath: string) => {
  const lockFilePath = getActionStatusFilePath(absoluteLockedFilePath);
  if (!fs.existsSync(lockFilePath)) {
    return;
  }
  return fsPromises.rm(lockFilePath);
};
