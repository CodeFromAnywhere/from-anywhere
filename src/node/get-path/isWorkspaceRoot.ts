import path from "node:path";
import fs from "node:fs";
import { tryParseJson } from "from-anywhere";
import { Operation } from "../../types/index.js";
/**
 * simple sync function to check if a folder is the root of a workspace (not operation but a workspace)
 */
export const isWorkspaceRoot = (
  folderPath: string,
): undefined | { isBundle: boolean; isWorkspaceRoot: boolean } => {
  const packageJsonPath = path.join(folderPath, "package.json");
  const existsPackageJson = fs.existsSync(packageJsonPath);
  if (!existsPackageJson) return;

  const packageJson = tryParseJson<Operation>(
    fs.readFileSync(packageJsonPath, "utf8"),
  );

  if (!packageJson || !packageJson.workspaces) {
    return;
  }

  return {
    isBundle: packageJson.operation?.isBundle || false,
    isWorkspaceRoot: true,
  };
};
