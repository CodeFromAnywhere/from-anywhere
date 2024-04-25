import { sleep } from "from-anywhere";
import { getActionStatusFilePath } from "./getActionStatusFilePath.js";
import { fs } from "from-anywhere/node";

/** Returns a boolean indicating whether the file is unlocked (isUnlocked) */
export const waitUntilUnlocked = async (
  absoluteFilePath: string,
  maxWaitMs: number = 300000,
  waitStepMs: number = 1000,
) => {
  const lockFilePath = getActionStatusFilePath(absoluteFilePath);

  let totalWaitedMs = 0;

  while (fs.existsSync(lockFilePath)) {
    totalWaitedMs = totalWaitedMs + waitStepMs;
    await sleep(waitStepMs);

    if (totalWaitedMs > maxWaitMs) {
      break;
    }
  }

  return !fs.existsSync(lockFilePath);
};
