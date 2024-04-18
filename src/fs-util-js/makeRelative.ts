/**
 * Makes a path relative using proper parsing
 *
 * Resulting path will apply the paths conventions
 * - no slash at the end
 * - no slash at the beginning
 *
 * NB: also works with relative paths
 */

export const makeRelative = (
  /**
   * absolute path of a file or folder without a slash at the end
   */
  absolutePath: string,
  /**
   * folder path without a slash at the end
   */
  baseFolderPath: string
): string => {
  if (baseFolderPath.length === 0) return absolutePath;
  // basecase should be handled, we don't want to get some weird slice edgecase
  if (absolutePath.length < baseFolderPath.length) return "";

  return absolutePath.slice(baseFolderPath.length + 1);
};
