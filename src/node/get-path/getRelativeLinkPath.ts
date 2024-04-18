import { makeRelative } from "../../fs-util-js/makeRelative.js";
import { getCommonAncestor } from "./getCommonAncestor.js";
/**
 * returns a relative link between two files
 */
export const getRelativeLinkPath = (
  absoluteFromFilePath: string,
  absoluteToFilePath: string,
  debug?: boolean,
): string => {
  const commonAncestorPath = getCommonAncestor(
    absoluteFromFilePath,
    absoluteToFilePath,
  );

  //1 - go from `absoluteFromPath` to `commonAncestorPath`
  const commonAncestorRelativeFromPath = makeRelative(
    absoluteFromFilePath,
    commonAncestorPath,
  );

  const commonAncestorRelativeToPath = makeRelative(
    absoluteToFilePath,
    commonAncestorPath,
  );

  const foldersToGoBackAmount =
    commonAncestorRelativeFromPath.split("/").length - 1;

  const backOrStart =
    foldersToGoBackAmount === 0 ? "./" : "../".repeat(foldersToGoBackAmount);

  //2 - go from `commonAncestorPath` to `absoluteToPath`
  const relativeLinkPath = `${backOrStart}${commonAncestorRelativeToPath}`;

  if (debug) {
    console.log({
      commonAncestorPath,
      commonAncestorRelativeFromPath,
      commonAncestorRelativeToPath,
    });
  }

  return relativeLinkPath;
};
