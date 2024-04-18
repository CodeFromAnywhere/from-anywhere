import { generatedFolders } from "../../filename-conventions/filename-conventions.js";
import { getPathsWithOperations } from "../get-path/getPathsWithOperations.js";
import { explore } from "./explore.js";
export const findAllPackages = (config?: {
  basePath: string | string[] | undefined;
}) => {
  return explore({
    basePath: config?.basePath || getPathsWithOperations(),
    search: "package.json",
    exact: true,
    extension: "json",
    searchLevel: "fileName",
    ignore: generatedFolders.concat(["src", "assets", "data"]),
  });
};
