export const getSubExtensions2 = (absolutePath) => {
    const mdFileName = absolutePath.split("/").pop();
    const allSubExtensionsArray = mdFileName?.split(".") || [];
    const allSubExtensions = allSubExtensionsArray.slice(1, allSubExtensionsArray.length - 1);
    return allSubExtensions;
};
//# sourceMappingURL=getSubExtensions2.js.map