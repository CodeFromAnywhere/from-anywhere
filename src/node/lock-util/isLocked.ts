import fs from "node:fs";
import fsPromises from "node:fs/promises";
import { ActionStatus } from "../../filename-conventions/ActionStatus.js";
import { readJsonFileSync } from "../fs-util/readJsonFile.js";
import { lockfileSuffix } from "./constants.js";
import { getActionStatusFilePath } from "./getActionStatusFilePath.js";
export const isLocked = (absolutePath: string) => {
  const actionStatusFilePath = getActionStatusFilePath(absolutePath);

  if (fs.existsSync(actionStatusFilePath)) {
    const lock = readJsonFileSync<ActionStatus>(actionStatusFilePath);

    if (!lock) {
      //definitely no lockfile
      return false;
    }

    if (lock.cleanupAt && Date.now() >= lock.cleanupAt) {
      fsPromises.rm(actionStatusFilePath);
      return false;
    }

    // there's a lockfile not to be cleaned up yet
    if (lock.updatedAt) {
      // status has recently enough been updated
      return true;
    }
    return false;
  }
  return false;
};
