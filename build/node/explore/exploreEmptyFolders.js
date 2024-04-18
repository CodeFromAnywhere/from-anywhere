import { explore } from "./explore.js";
export const exploreEmptyFolders = async (basePath) => {
    const result = await explore({
        basePath,
        includeFoldersWithResults: true,
        cancelRecursionOn: (pathArray) => pathArray.length === 0,
    });
    const emptyFolders = result
        .filter((x) => x.isCancelRecursionResult)
        .map((x) => x.path);
    return emptyFolders;
};
//# sourceMappingURL=exploreEmptyFolders.js.map