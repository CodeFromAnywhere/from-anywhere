import fs from "node:fs";
const fsPromises = fs.promises;
import { writeStringToFile } from "../fs-util/files.js";

export const maxQueryTimeMs = 10000;

export const waitForDotLockRecursive = async (
  lockfilePath: string,
): Promise<boolean> => {
  if (fs.existsSync(lockfilePath)) {
    const unixDate = await fsPromises.readFile(lockfilePath);
    const msAgo = Date.now() - Number(unixDate);
    if (msAgo < maxQueryTimeMs) {
      // wait a 100ms!
      // console.log("Waiting for lockfile...");

      await new Promise<undefined>((resolve) =>
        setTimeout(() => resolve(undefined), 100),
      );
      return waitForDotLockRecursive(lockfilePath);
    }

    // if we get here, the file exists for more than 10 seconds

    console.log(
      "Warning: lockfile exists more than ten seconds. I'm assuming the operation failed (maybe server stopped during)",
      lockfilePath,
    );
  }

  await writeStringToFile(lockfilePath, String(Date.now()));

  return true;
};
