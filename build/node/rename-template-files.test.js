import { renameTemplateToNormalFile, isEqualArray, renameToTemplateFile, } from "./rename-template-files.js";
const test = () => {
    const fileNames = [".gitignore", "package.json", "Podfile"];
    const changedFileNames = fileNames
        .map(renameToTemplateFile)
        .map(renameTemplateToNormalFile);
    return isEqualArray(fileNames, changedFileNames);
};
test();
//# sourceMappingURL=rename-template-files.test.js.map