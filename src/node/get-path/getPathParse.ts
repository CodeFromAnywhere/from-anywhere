import { PathParse } from "../../types/index.js";
import { getProjectRoot } from "./getProjectRoot.js";
/**
 * gets all kinds of information that can be inferred from any path (file or folder).
 */
export const getPathParse = (absolutePath: string): PathParse | undefined => {
  const projectRoot = getProjectRoot(absolutePath);
  if (!projectRoot) return;
  const relativePathFromProjectRoot = absolutePath.slice(projectRoot.length);
  return { relativePathFromProjectRoot };
};
