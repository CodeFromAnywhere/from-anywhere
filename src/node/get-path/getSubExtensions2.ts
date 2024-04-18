export const getSubExtensions2 = (absolutePath: string): string[] => {
  const mdFileName = absolutePath.split("/").pop();
  const allSubExtensionsArray = mdFileName?.split(".") || [];
  const allSubExtensions = allSubExtensionsArray.slice(
    1,
    allSubExtensionsArray.length - 1
  );
  return allSubExtensions;
};
