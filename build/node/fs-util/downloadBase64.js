import { getObjectKeysArray } from "../../getObjectKeysArray.js";
import { path } from "./path.js";
import { mimeTypes } from "../../types/asset-type";
/**
 * Downloads a file and buffers it to a base64 string
 * Promises the base64 or null if something went wrong
 */
export const downloadBase64 = async (url) => {
    // console.log({ url });
    const name = path.parse(url).name;
    const result = await fetch(url)
        .then(async (response) => ({
        arrayBuffer: await response.arrayBuffer(),
        contentType: response.headers.get("content-type"),
    }))
        .then(({ arrayBuffer, contentType }) => {
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const extension = getObjectKeysArray(mimeTypes).find((x) => mimeTypes[x] === contentType);
        const withDot = extension ? `.${extension}` : "";
        const filename = `${name}${withDot}`;
        return { base64, contentType, filename };
    })
        .catch((e) => {
        console.log(e);
        return null;
    });
    return result;
};
//# sourceMappingURL=downloadBase64.js.map