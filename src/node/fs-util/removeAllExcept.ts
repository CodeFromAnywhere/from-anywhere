import { fs } from "./fs.js";
import { path } from "./path.js";
/**
 * Removes everything inside a folder except some files and folders that can, optionally, be ignored for removal. does not remove the folder itself
 *
 * NB: make this work with subdirectories!
 */
export const removeAllExcept = async (
  folderPath: string,
  config?: {
    /**
     * array of relative folder paths and file paths that should not be removed (include the extensions!)
     */
    ignore?: string[];
    typeToRemove?: "file" | "folder";
  },
): Promise<
  {
    name: string;
    removed: boolean;
  }[]
> => {
  const filesAndFolders = await fs.readdir(folderPath, {
    encoding: "utf8",
    withFileTypes: true,
  });

  const removePromises = filesAndFolders.map((dirent) => {
    if (config?.ignore?.find((x) => x.includes(dirent.name)))
      return { name: dirent.name, removed: false };

    if (config?.typeToRemove === "file" && !dirent.isFile())
      return { name: dirent.name, removed: false };

    if (config?.typeToRemove === "folder" && !dirent.isDirectory())
      return { name: dirent.name, removed: false };

    return fs
      .rm(path.join(folderPath, dirent.name), { recursive: true })
      .then(() => ({ name: dirent.name, removed: true }));
  });

  const promised = await Promise.all(removePromises);
  return promised;
};
