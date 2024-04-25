import path from "node:path";
import { lockfileSuffix } from "./constants.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { ActionStatus } from "../../filename-conventions/ActionStatus.js";
import { getUpdatedTimeObject } from "../../types/index.js";

/**
 * lock a file with a given error message
 */
export const lockError = async (
  aboluteLockableFilePath: string,
  errorMessage: string,
  /**
   * Defaults to never
   */
  cleanupAt?: number,
  functionName?: string,
  parameters?: any[],
) => {
  const parsedPath = path.parse(aboluteLockableFilePath);

  const lockFilePath = path.join(
    parsedPath.dir,
    `${parsedPath.name}${lockfileSuffix}`,
  );

  await writeJsonToFile<ActionStatus>(lockFilePath, {
    ...getUpdatedTimeObject(),
    status: "error",
    functionName: functionName || "lockError",
    parameters,
    message: errorMessage,
    cleanupAt,
  });
};
