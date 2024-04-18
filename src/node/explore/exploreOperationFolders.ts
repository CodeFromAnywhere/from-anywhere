import fs from "node:fs";
import path from "node:path";
import { BaseConfig } from "./explore.js";
import { findAllPackages } from "./findAllPackages.js";
import { getFolder } from "../fs-util/js.js";
/**
 find all active operations (folders having `package.json` but also `tsconfig.json`)

 returns folder path array
  */
export const exploreOperationFolders = async (
  config: BaseConfig,
): Promise<string[]> => {
  const folders = (
    await findAllPackages({
      basePath: config?.basePath,
    })
  )
    .map((x) => x.path)
    .map((p) => getFolder(p))
    .filter((p) => {
      const alsoTsConfig = fs.existsSync(path.join(p, "tsconfig.json"));
      return alsoTsConfig;
    });

  return folders;
};
