/**
 * Takes a folder path and returns a path that is one folder up
 */

export const getOneFolderUpPath = (folderPath: string) => {
  const pathParts = folderPath.split("/");
  pathParts.pop();
  return pathParts.join("/");
};
