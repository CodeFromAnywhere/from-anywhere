import { O } from "../../types/O.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { lockAction } from "../lock-util/lockAction.js";
/**
 * Takes an absolute path to a json and a type generic and provides a map function with which you can alter that JSON (read, map, save)
 */
export const mapObjectJson = async <T extends O, U>(
  absolutePath: string,
  mapFunction: (item: T) => U,
  /**
   * Give this if you still want to map if there is no json yet (create)
   */
  createObjectIfNonExistent?: T,
) => {
  if (!absolutePath) {
    return false;
  }

  return lockAction(absolutePath, async () => {
    const json = await readJsonFile<T>(absolutePath);

    if (!json) {
      console.log(`JSON read failed (${absolutePath})`, { type: "warning" });
    }

    if (!json && !createObjectIfNonExistent) {
      return false;
    }

    const realJson = json || createObjectIfNonExistent;

    if (!realJson) {
      return false;
    }

    const newJson = mapFunction(realJson);

    const isSuccessful = await writeJsonToFile(absolutePath, newJson);

    return isSuccessful;
  });
};
