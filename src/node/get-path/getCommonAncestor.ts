/**
 * Finds the common ancestor for two absolute pahts
 */
export const getCommonAncestor = (path1: string, path2: string): string => {
  const chunks = path1.split("/");
  const chunks2 = path2.split("/");

  const firstFolderMismatchIndex = chunks.findIndex((chunk, index, array) => {
    const isMismatch = chunks2[index] !== chunk;

    return isMismatch;
  });

  const commonAncestor = chunks.slice(0, firstFolderMismatchIndex).join("/");

  return commonAncestor;
};
