import { getFolderTypescriptFiles } from "./explore/getFolderTypescriptFiles.js";
/**
 * get last updated file updatedAt time in whole folder, recursively. only finds typescript files, ignores index.
 */
export const folderGetUpdatedAt = async (config: {
  folderPath: string;
}): Promise<number> => {
  const { folderPath } = config;
  const typescriptFiles = await getFolderTypescriptFiles(folderPath, true);
  return typescriptFiles.reduce((updatedAt, file) => {
    const fileUpdatedAt = file.stats?.updatedAt;
    if (!fileUpdatedAt) return updatedAt;
    if (fileUpdatedAt > updatedAt) return fileUpdatedAt;
    return updatedAt;
  }, 0);
};
