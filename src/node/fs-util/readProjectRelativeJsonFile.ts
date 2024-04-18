import path from "node:path";
import { readJsonFile } from "./readJsonFile.js";
export const readProjectRelativeJsonFile = async <T>(
  projectRelativePath: string,
  projectRoot: string,
): Promise<T | null> => {
  if (!projectRoot) return null;

  const fullPath = path.join(projectRoot, projectRelativePath);

  return readJsonFile<T>(fullPath);
};
