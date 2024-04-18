import path from "node:path";
/**
 * Checks if pathArray contains a package.json and a tsconfig.json and thus should be an operation
 *
 * Handy for `cancelRecursionOn` in `explore`
 */
export const pathArrayIsOperation = (pathArray: string[]) => {
  const hasPackageJson = !!pathArray.find(
    (x) => path.parse(x).base === "package.json",
  );
  const hasTsConfig = !!pathArray.find(
    (x) => path.parse(x).base === "tsconfig.json",
  );

  const isOperation = hasPackageJson && hasTsConfig;
  return isOperation;
};
