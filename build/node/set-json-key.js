#!/usr/bin/env node
import { fs } from "./fs-util/index.js";
import { path } from "./fs-util/index.js";
import { getFolder } from "./fs-util/index.js";
export function setKeyAtLocation(path, value, object) {
    var schema = object; // a moving reference to internal objects within obj
    var pList = path.split(".");
    var len = pList.length;
    for (var i = 0; i < len - 1; i++) {
        var elem = pList[i];
        if (!schema[elem])
            schema[elem] = {};
        schema = schema[elem];
    }
    schema[pList[len - 1]] = value;
}
/*
npx setjsonkey [json-path] key1.key2.[index/latest/push].key3 "value"


 collect arguments 1 2 and 3
 find file (arg1) in path, import json (or start with empty object in a new file)
 reduce keys (arg2) to go deeper into the object and create keys as they don't exist
 make sure it works with arrays too
 convert value string (arg3) to number, boolean if they seem to be like that

*/
export const setJsonKey = async ({ jsonPath, keyLocation, value, debug, }) => {
    const usage = 'usage: npx setjsonkey [json-file-path] key1.key2.[index/latest/push].key3 "value" (Check https://github.com/Code-From-Anywhere/setjsonkey for more info)';
    // VALIDATION
    if (!keyLocation || keyLocation.length === 0) {
        console.log(usage);
        process.exit(0);
    }
    const jsonPathWithExtension = jsonPath.endsWith(".json")
        ? jsonPath
        : jsonPath + ".json";
    const absolutePath = path.resolve(jsonPathWithExtension);
    const fileExists = fs.existsSync(absolutePath);
    if (!fileExists) {
        const folder = getFolder(absolutePath);
        console.log("creating folder because it didn't exist yet", folder);
        fs.mkdir(folder, { recursive: true });
    }
    let object = {};
    if (fileExists) {
        try {
            object = JSON.parse(await fs.readTextFile(absolutePath));
        }
        catch (e) {
            console.log("No JSON found here, so we're overwriting it with our new JSON");
        }
    }
    if (typeof object !== "object") {
        object = {};
    }
    const realValue = value === "true" || value === "false"
        ? Boolean(value)
        : !isNaN(Number(value))
            ? Number(value)
            : value;
    // UPDATE/SET JSON key
    setKeyAtLocation(keyLocation, realValue, object);
    const newObject = JSON.stringify(object, undefined, 2);
    await fs.writeFile(absolutePath, newObject, { encoding: "utf8" });
    if (debug) {
        console.log({ absolutePath, fileExists, object, newObject });
        console.log("succesfully changed your json!");
    }
};
//# sourceMappingURL=set-json-key.js.map