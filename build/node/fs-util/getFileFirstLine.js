import { fs } from "./fs.js";
import { readFilePerLine } from "./readFilePerLine.js";
/**
Only gets first line
 */
export const getFileFirstLine = async (absoluteFilePath) => {
    if (!fs.existsSync(absoluteFilePath))
        return;
    const firstLine = await new Promise(async (resolve) => {
        await readFilePerLine(absoluteFilePath, (line, close) => {
            resolve(line);
            close();
        });
    });
    return firstLine;
};
//# sourceMappingURL=getFileFirstLine.js.map