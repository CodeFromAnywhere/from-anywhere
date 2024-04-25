import fs from "node:fs";
import { writeJsonToFile } from "../fs-util/files.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { lockAction } from "../lock-util/lockAction.js";
export const upsertJson = async (absolutePath, mapFunction) => {
    if (!absolutePath) {
        return;
    }
    if (!fs.existsSync(absolutePath)) {
        // if it didn't exist yet it's easy, just create
        const result = await mapFunction(undefined);
        const isSuccessful = await writeJsonToFile(absolutePath, result);
        return isSuccessful;
    }
    const res = await lockAction(absolutePath, async () => {
        const json = await readJsonFile(absolutePath);
        const result = await mapFunction(json || undefined);
        const isSuccessful = await writeJsonToFile(absolutePath, result);
        return isSuccessful;
    });
    return res;
};
//# sourceMappingURL=upsertJson.js.map