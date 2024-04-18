import { fs } from "./fs.js";
import { path } from "./path.js";
export function fileExistsWithCaseSync(filepath) {
    var dir = path.dirname(filepath);
    if (dir === "/" || dir === ".")
        return true;
    var filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(filepath)) === -1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}
//# sourceMappingURL=fileExistsWithCaseSync.js.map