import { tryParseJson } from "./tryParseJson.js";
/** Tries to find JSON in strings in JSON. If it does, parses that JSON and replaces the string with the parsed JSON. */
export const unwrapJson = (json) => {
    if (json === null) {
        return null;
    }
    if (json === undefined) {
        return null;
    }
    if (typeof json === "boolean") {
        return json;
    }
    if (typeof json === "object" && !Array.isArray(json)) {
        const result = Object.keys(json).map((key) => {
            const value = json[key];
            return { [key]: unwrapJson(value) };
        });
        return result;
    }
    if (typeof json === "object" && Array.isArray(json)) {
        return json.map((item) => unwrapJson(item));
    }
    if (typeof json === "string") {
        // THE MAGIC
        const parsed = tryParseJson(json);
        return parsed || json;
    }
    //number is left
    return json;
};
//# sourceMappingURL=unwrapJson.js.map