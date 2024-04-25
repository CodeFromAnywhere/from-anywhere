import fs from "node:fs";
import { NestedPartial } from "../../NestedPartial.js";
import { O } from "../../types/O.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { mergeNestedObject } from "../../mergeNestedObject.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { lockAction } from "../lock-util/lockAction.js";
/**
 * Uses mergeNestedObject on a JSON file
 */
export const updateSingleNestedJsonFile = async <T extends O>(
  path: string,
  partialNewObject: NestedPartial<T>,
  /**
   * provide this if you want to use it in case the JSON doesn't exist yet
   */
  newObject?: T,
) => {
  if (!path || !fs.existsSync(path)) {
    return false;
  }
  return lockAction(path, async () => {
    const json = await readJsonFile<T>(path);
    if (!json && !newObject) {
      return false;
    }
    const start = json || newObject;
    if (!start) {
      return false;
    }

    const newData = mergeNestedObject(start, partialNewObject);

    const isSuccessful = await writeJsonToFile(path, newData);
    return isSuccessful;
  });
};
