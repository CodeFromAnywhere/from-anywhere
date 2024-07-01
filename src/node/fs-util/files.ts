#!/usr/bin/env node
import { Path } from "../../types/markdown-types/index.js";
import { fs } from "./fs.js";
import { PathLike } from "node:fs";
import { getFolder } from "./js.js";
import { tryJsonStringify } from "../../tryJsonStringify.js";

/**
 * JSON stringify sensor used to filter out circular deps as per this ticket: https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
 *
 * Ended up not using it (seems to have side-effects) but could be useful to keep here
 */
export const censor = (censor: any) => {
  var i = 0;

  return function (key: any, value: any) {
    if (
      i !== 0 &&
      typeof censor === "object" &&
      typeof value == "object" &&
      censor == value
    )
      return "[Circular]";

    if (i >= 29)
      // seems to be a harded maximum of 30 serialized objects?
      return "[Unknown]";

    ++i; // so we know we aren't using the original object anymore

    return value;
  };
};

/**
 * writes all values in an object to the file that should be specified as key of that value
 */
export const writeToFiles = async (
  fileObject: {
    [absoluteFilePath: string]: any;
  },
  isJson?: boolean,
) => {
  let s = 0;
  let e = 0;
  const writePromises = Object.keys(fileObject).map(async (filePath) => {
    const value = fileObject[filePath];

    if (isJson) {
      const success = await writeJsonToFile(filePath, value);
      if (success) s++;
      if (!success) e++;

      return success;
    }
    await fs.writeFile(filePath, value, "utf8");
    s++;
  });
  await Promise.all(writePromises);
};

/**
 * uses fs.access to determine if something can be accessed
 *
 * Check File access constants for possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.W_OK | fs.constants.R_OK).
 */
export const canAccess = async (
  p: PathLike,
  mode: number,
): Promise<boolean> => {
  try {
    await fs.access(p, mode);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * uses fs.access to determine if something can be accessed
 *
 * Check File access constants for possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.W_OK | fs.constants.R_OK).
 */
export const canAccessSync = (p: PathLike, mode: number): boolean => {
  try {
    fs.accessSync(p, mode);
    return true;
  } catch (e) {
    return false;
  }
};
/**
 * File is visible to the calling process
 */
export const canSee = async (p: PathLike) => canAccess(p, fs.constants.F_OK);
/**
 * File is readable to the calling process
 */
export const canRead = async (p: PathLike) => canAccess(p, fs.constants.R_OK);
/**
 * File is writable to the calling process
 */
export const canWrite = async (p: PathLike) => canAccess(p, fs.constants.W_OK);
/**
 * File is executable to the calling process
 */
export const canExecute = async (p: PathLike) =>
  canAccess(p, fs.constants.X_OK);

/**
 * File is visible to the calling process
 */
export const canSeeSync = async (p: PathLike) =>
  canAccessSync(p, fs.constants.F_OK);
/**
 * File is readable to the calling process
 */
export const canReadSync = (p: PathLike) => canAccessSync(p, fs.constants.R_OK);
/**
 * File is writable to the calling process
 */
export const canWriteSync = (p: PathLike) =>
  canAccessSync(p, fs.constants.W_OK);
/**
 * File is executable to the calling process
 */
export const canExecuteSync = (p: PathLike) =>
  canAccessSync(p, fs.constants.X_OK);

/**
 * write json to a file
 *
 * makes the dir and file if they don't exist
 */
export const writeJsonToFile = async <T extends unknown>(
  p: Path,
  data: T,
): Promise<boolean> => {
  if (!data) {
    console.log("no data", { p, data });
    return false;
  }
  const stringifiedData = tryJsonStringify(data);

  if (!stringifiedData) {
    console.log(`could not stringify data`, p);
    return false;
  }
  const folderToBe = getFolder(p);
  if (!fs.existsSync(folderToBe)) {
    //first, make sure the folder exists
    await fs.mkdir(folderToBe, { recursive: true });
  }
  //then write it
  await fs.writeFile(p, stringifiedData, "utf8");
  return true;
};

/**
 * write string to a file
 *
 * makes the dir and file if they don't exist
 */
export const writeStringToFile = async (
  p: Path,
  data: string,
): Promise<boolean> => {
  if (data === undefined || data === null || typeof data !== "string") {
    console.log(`Incorrect data provided`, data);
    return false;
  }

  const folderToBe = getFolder(p);

  if (!fs.existsSync(folderToBe)) {
    //first, make sure the folder exists
    await fs.mkdir(folderToBe, { recursive: true });
  }

  //then write it
  await fs.writeFile(p, data, "utf8");

  return true;
};
