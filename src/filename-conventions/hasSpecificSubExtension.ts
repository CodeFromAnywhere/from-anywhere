import { makeArray } from "../general.js";
/**
 * Returns true if a fileid includes one of the specified subextensions.
 */
export const hasSpecificSubExtension = (
  srcRelativeFileId: string,
  subExtensions: string | string[],
  /**
   * if true, also returns true if the extension is the complete name of the file
   */
  includeRootName?: boolean,
): boolean => {
  const subExtensionsArray = makeArray(subExtensions);
  const parts = srcRelativeFileId.split(".");
  const isSinglePart = parts.length === 1;
  const subExtension = parts.pop()!;
  const includesSubExtension = subExtensionsArray.includes(subExtension);
  const isCounting = includeRootName ? true : !isSinglePart;
  const has = isCounting && includesSubExtension;
  return has;
};
