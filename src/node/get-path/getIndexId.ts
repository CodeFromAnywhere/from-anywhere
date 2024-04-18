import { generateId } from "from-anywhere";
import { findOperationBasePath } from "./findOperationBasePath.js";
import { getOperationPathParse } from "./getOperationPathParse.js";
import { TsIndexModelType } from "../../types/index.js";
import { kebabCase } from "../../convert-case.js";
export const getIndexId = async (
  filePath: string,
  name: string,
): Promise<TsIndexModelType | undefined> => {
  const operationPathParse = getOperationPathParse(filePath);
  if (!operationPathParse) return;
  const operationBasePath = findOperationBasePath(filePath);
  if (!operationBasePath) return;

  const { operationRelativeTypescriptFilePath, relativePathFromProjectRoot } =
    operationPathParse;

  // TODO: not sure if the projectRelativepath is correc,t that is probably needs to be a path to the db file!
  const tsIndexModelType: TsIndexModelType = {
    operationName: operationPathParse.operationName || null,
    operationRelativeTypescriptFilePath,
    // TODO: FIX
    projectRelativePath: relativePathFromProjectRoot,
    // operationName: "",
    // operationRelativePath: "",
    // projectRelativePath: "",
    // operationRelativeTypescriptFilePath: "",
    // srcFileId: "",

    id: generateId(),
    name,
    slug: kebabCase(name),
  };

  return tsIndexModelType;
};
