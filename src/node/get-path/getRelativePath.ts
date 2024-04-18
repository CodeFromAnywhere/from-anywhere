// import { path } from "./path.js";
import { getRootPath } from "./getRootPath.js";

/**
 * gets the relative path from a specified root
 *
 * will start with "/"
 */
export const getRelativePath = (
  absolutePath: string,
  relativeFrom: "project-root",
) => {
  const rootPath =
    relativeFrom === "project-root" ? getRootPath() : getRootPath();

  if (!rootPath) return;

  const relativePath = absolutePath.replace(rootPath, "");

  return relativePath;
};
