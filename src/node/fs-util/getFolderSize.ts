import { fs } from "./fs.js";
import { path } from "./path.js";
export const getFolderSize = async (
  absoluteFolderPath: string,
): Promise<number> => {
  const files = await fs.readdir(absoluteFolderPath, { withFileTypes: true });

  const paths = files.map(async (file) => {
    const newPath = path.join(absoluteFolderPath, file.name);

    if (file.isDirectory()) {
      return await getFolderSize(newPath);
    }

    if (file.isFile()) {
      const size = fs.existsSync(newPath)
        ? (await fs.stat(newPath))?.size
        : undefined;

      return size || 0;
    }

    return 0;
  });

  return (
    (await Promise.all(paths))
      //  NB: lol!
      .flat(Infinity)
      .reduce((i, size) => i + size, 0)
  );
};
