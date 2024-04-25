import fs from "node:fs";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { lockAction } from "../lock-util/lockAction.js";
export const mapArrayJson = async <T, U>(
  absolutePath: string,
  mapFunction: (item: T) => U,
) => {
  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return;
  }

  const res = await lockAction(absolutePath, async () => {
    const json = await readJsonFile<T[]>(absolutePath);

    if (!json) return;
    const newJson = json.map(mapFunction);

    const isSuccessful = await writeJsonToFile(absolutePath, newJson);
    return isSuccessful;
  });

  return res;
};
