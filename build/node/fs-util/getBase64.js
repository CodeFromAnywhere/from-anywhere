import { isUrl } from "../../isUrl.js";
import { downloadBase64 } from "./downloadBase64.js";
import { fs } from "./fs.js";
import { mimeTypes } from "../../types/asset-type";
import { getExtension } from "../../fs-util-js";
import { path } from "./path.js";
/**
 * Get the base64 of a file that is located either absolutely in your server, or remotely on a URL
 *
 * Assumes there's internet, otherwise fails silently
 */
export const getBase64 = async (urlOrAbsolutePath) => {
    if (isUrl(urlOrAbsolutePath)) {
        const result = await downloadBase64(urlOrAbsolutePath);
        return result;
    }
    if (fs.existsSync(urlOrAbsolutePath)) {
        const base64 = await fs
            .readFile(urlOrAbsolutePath)
            .then((buffer) => buffer.toString("base64"));
        const extension = getExtension(urlOrAbsolutePath);
        const contentType = mimeTypes[extension];
        const filename = path.parse(urlOrAbsolutePath).base;
        return { base64, contentType, filename };
    }
    return null;
};
//# sourceMappingURL=getBase64.js.map