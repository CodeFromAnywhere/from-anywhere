import fs from "node:fs";
import { readJsonFile } from "../fs-util/readJsonFile.js";
import { writeJsonToFile } from "../fs-util/files.js";
import { lockAction } from "../lock-util/lockAction.js";
export const mapArrayJson = async (absolutePath, mapFunction) => {
    if (!absolutePath || !fs.existsSync(absolutePath)) {
        return;
    }
    const res = await lockAction(absolutePath, async () => {
        const json = await readJsonFile(absolutePath);
        if (!json)
            return;
        const newJson = json.map(mapFunction);
        const isSuccessful = await writeJsonToFile(absolutePath, newJson);
        return isSuccessful;
    });
    return res;
};
//# sourceMappingURL=mapArrayJson.js.map