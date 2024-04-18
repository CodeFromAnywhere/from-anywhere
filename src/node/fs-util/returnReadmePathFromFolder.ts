import { fs } from "./fs.js";
import { path } from "./path.js";
/**
 returns a readme path from folder, if it's there, regardless of the exact  capitilisation
 */
export const returnReadmePathFromFolder = async (
  absoluteFolderPath: string,
): Promise<string | undefined> => {
  const dirents = await fs.readdir(absoluteFolderPath, {
    withFileTypes: true,
    encoding: "utf8",
  });

  const readmeDirent = dirents.find(
    (x) => x.isFile() && x.name.toLowerCase() === "readme.md",
  );
  if (!readmeDirent) return;
  const absoluteReadmeFilePath = path.join(
    absoluteFolderPath,
    readmeDirent.name,
  );
  return absoluteReadmeFilePath;
};
