import { getProjectRoot } from "../get-path/getProjectRoot.js";
import { exploreOperationFolders } from "./exploreOperationFolders.js";
import path from "node:path";
import { getPathsWithOperations } from "../get-path/getPathsWithOperations.js";
import { getLastFolder } from "../fs-util/js.js";
/*
Gets a path of any operation in the project
*/
export const getOperationPath = async (
  /**
   * specify the operation folder name
   */
  operationName: string,
  config: {
    manualProjectRoot?: string;
    /**
     * if true, will not use sdk (defaults to using it first...)
     */
    notUseSdk?: boolean;
    operationPathsObject: { [operationName: string]: string };
  },
): Promise<string | undefined> => {
  // NB: In case of manualProjectRoot, we should not use the SDK! The sdk is from our own project root.
  if (!config?.notUseSdk && !config?.manualProjectRoot) {
    const projectRelativeOperationPath =
      config.operationPathsObject[
        operationName as keyof typeof config.operationPathsObject
      ];
    const projectRoot = getProjectRoot();
    if (projectRelativeOperationPath && projectRoot) {
      return path.join(projectRoot, projectRelativeOperationPath);
    }
  }

  // if that didn't work, let's find it in realtime
  const basePath = getPathsWithOperations({
    manualProjectRoot: config?.manualProjectRoot,
  });

  const operationPaths: string[] = await exploreOperationFolders({ basePath });

  if (operationPaths.length === 0) {
    console.log("No operations available", { type: "error" });
    return;
  }
  const operationPathsWithTheirFolder = await Promise.all(
    operationPaths.map(async (p) => ({
      path: p,
      folderName: getLastFolder(p),
    })),
  );

  const foundPath = operationPathsWithTheirFolder.find(
    (f) => f.folderName === operationName,
  )?.path;

  return foundPath;
};
