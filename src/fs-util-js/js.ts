export const getFolderJs = <T extends string | undefined>(filePath: T): T => {
  if (filePath === undefined) return undefined as T;
  const chunks = filePath.split("/");
  chunks.pop();
  const allWithoutFile = chunks.join("/") as T;
  return allWithoutFile;
};

export const getFileOrFolderName = <T extends string | undefined>(
  fileOrFolderPath: T,
): T => {
  if (!fileOrFolderPath) return undefined as T;
  const last = fileOrFolderPath.split("/").pop()!;
  return last as T;
};

export const isPathRelative = (path: string) =>
  path.startsWith("./") || path.startsWith("../");

export const removeTrailingSlash = (p: string) =>
  p.charAt(0) === "/" ? p.slice(1) : p;

/**
 * removes extension from the filename
 *
 */
export const withoutExtension = (fileName: string) => {
  const pieces = fileName.split(".");
  pieces.pop();
  return pieces.join(".");
};

/**
 * returns the extension of the filename or path WITHOUT dot
 *
 * NB: not sure, but could be nice to replace this with path.extname(pathString)
 */
export const getExtension = (fileNameOrPath: string) => {
  const pieces = fileNameOrPath.split(".");
  return pieces.pop()!;
};
