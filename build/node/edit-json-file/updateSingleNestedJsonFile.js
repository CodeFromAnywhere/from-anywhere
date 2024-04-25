import fs from "node:fs";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { mergeNestedObject } from "../../mergeNestedObject.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { lockAction } from "../lock-util/lockAction.js";
/**
 * Uses mergeNestedObject on a JSON file
 */
export const updateSingleNestedJsonFile = async (path, partialNewObject, 
/**
 * provide this if you want to use it in case the JSON doesn't exist yet
 */
newObject) => {
    if (!path || !fs.existsSync(path)) {
        return false;
    }
    return lockAction(path, async () => {
        const json = await readJsonFile(path);
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
//# sourceMappingURL=updateSingleNestedJsonFile.js.map