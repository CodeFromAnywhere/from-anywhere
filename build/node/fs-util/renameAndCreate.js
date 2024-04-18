import { fs } from "./fs.js";
import { path } from "./path.js";
export const renameAndCreate = async (oldPath, newPath) => {
    const newPathFolderPath = path.parse(newPath).dir;
    if (!fs.existsSync(newPathFolderPath)) {
        await fs.mkdir(newPathFolderPath, { recursive: true });
    }
    await fs.rename(oldPath, newPath);
};
//# sourceMappingURL=renameAndCreate.js.map