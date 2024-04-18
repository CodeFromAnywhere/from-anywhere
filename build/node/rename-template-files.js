#!/usr/bin/env bun
import { oneByOne } from "from-anywhere";
import { explore } from "./explore/index.js";
import fs from "node:fs/promises";
/*
As long as there are no .template files present in the template folder that DONT need to be changed, it is fine.
If there are, we should warn people.
*/
export const isEqualArray = (array1, array2) => array1.length === array2.length &&
    array1.every((value, index) => value === array2[index]);
const templateExtension = ".template";
const findTemplates = async (basePath, doNotExploreChildFolders) => {
    return (await explore({
        basePath,
        subExtension: ["template"],
        searchLevel: "fileName",
        doNotExploreChildFolders,
    })).map((textJson) => textJson.path);
};
export const renameToTemplateFile = (fileName) => {
    const extensionStartsAt = fileName.lastIndexOf(".");
    const insertPosition = extensionStartsAt === -1 ? fileName.length : extensionStartsAt;
    const beforeExtension = fileName.substring(0, insertPosition);
    const afterExtension = fileName.substring(insertPosition);
    return `${beforeExtension}${templateExtension}${afterExtension}`;
};
export const renameTemplateToNormalFile = (fileName) => {
    return fileName.replace(".template", "");
};
export const renameTemplateFiles = async (config) => {
    const { appDir } = config;
    // console.log(`renameTemplateFiles`, appDir);
    const templateFiles = await findTemplates(appDir);
    // console.log({ templateFiles });
    const renameables = templateFiles.map((path) => ({
        oldPath: path,
        newPath: renameTemplateToNormalFile(path),
    }));
    // console.log({ renameables });
    await oneByOne(renameables, async (oldNew) => fs.rename(oldNew.oldPath, oldNew.newPath));
    return;
};
//# sourceMappingURL=rename-template-files.js.map