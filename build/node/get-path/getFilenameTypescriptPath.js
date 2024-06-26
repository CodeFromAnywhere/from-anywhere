import { replaceLastOccurence } from "../../replaceLastOccurence.js";
export const getFilenameTypescriptPath = (sourceFilePath) => {
    const srcPath = sourceFilePath.replace("/build/", "/src/");
    const tsPath = replaceLastOccurence(srcPath, ".js", ".ts");
    return tsPath;
};
//# sourceMappingURL=getFilenameTypescriptPath.js.map