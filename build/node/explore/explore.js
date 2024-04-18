import { allowedSearchContentExtensions, extensions, fileTypes, generatedFolders, jsonExtensions, markdownExtensions, typescriptExtensions, } from "../../filename-conventions/index.js";
import fs from "node:fs";
import path from "node:path";
import fsPromises from "node:fs/promises";
import { getExtension } from "../../fs-util-js/js.js";
import { canRead, canSee } from "../fs-util/files.js";
import { makeArray, notEmpty } from "../../general.js";
import { getProjectRoot } from "../get-path/getProjectRoot.js";
import { removeIndexFromArray } from "../../array-modifications.js";
import { getSubExtension } from "../../fs-util-js/getSubExtension.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";
/**
 * type checker for a string to be an extension that can be searched for
 */
const isSearchContentExtension = (extension) => {
    return allowedSearchContentExtensions
        .map((x) => x)
        .includes(extension);
};
/**
 * returns the file type or null if it's unknown
 */
export const determineFileType = (filePath) => {
    const extension = path.parse(filePath).ext.substring(1);
    if (!isSearchContentExtension(extension))
        return null;
    const index = fileTypes.findIndex((fileType) => extensions[fileType].includes(extension));
    const fileType = fileTypes[index];
    return fileType;
};
/**
 *
 */
const getFileOutline = (filePath) => {
    console.log("outline is currently just filename");
    return filePath.split("/").pop();
};
const isMatch = ({ exact, searchContender, searches, }) => {
    return searches.length === 0
        ? true
        : exact
            ? searches.includes(searchContender)
            : searches.find((s) => searchContender.includes(s));
};
/**
 * gets needed contents of file path, based on the extension
 *
 * returns a markdownparse if it's markdown, a json parse for json, or a file content string for anything else
 */
const getContents = async (filePath) => {
    // console.log("Get contents", filePath);
    const extension = getExtension(filePath);
    if (!isSearchContentExtension(extension)) {
        return;
    }
    if (extension === "json") {
        return readJsonFile(filePath);
        // } else if (markdownExtensions.includes(extension)) {
        //   const contents = await fsPromises.readFile(filePath, "utf8");
        //   const markdownParse = mdToJsonParse(contents);
        //   return markdownParse;
    }
    else {
        const fileString = fsPromises.readFile(filePath, "utf8");
        return fileString;
    }
};
/**
 * This is the safe and friendly version of `findFilesRecursively`
 */
export const explore = async ({ basePath, searchLevel = "fileName", debug, ...other }) => {
    /** accessability depends on whether we need to be able to read the file, or just see it */
    const canAccess = async (p) => await (searchLevel === "outline" || searchLevel === "full"
        ? canRead
        : canSee)(p);
    /** basepaths becomes an array of only the basepaths that we can access */
    const accessibleBasePaths = makeArray(basePath || getProjectRoot())
        .filter(fs.existsSync)
        .filter(canAccess);
    if (debug)
        console.log(`finding files in ${accessibleBasePaths.join(",")}`);
    const textJsonPromises = accessibleBasePaths.map(async (p) => findFilesRecursively({
        basePath: p,
        searchLevel,
        debug,
        ...other,
    }));
    const textJsons = (await Promise.all(textJsonPromises)).flat();
    return textJsons;
};
/**
Explores your files with many possibilities.

NB: this function only searches one basePath, while explore can do multiple

TODO: since this not only finds files but also explores them, naming should be exploreFilesRecursively, probably.

TODO: TextJson[] is a bit weird name for the resulting type interface...
*/
export const findFilesRecursively = async (config) => {
    const { basePath, ignore, minimumUpdatedAt, searchLevel, extension, subExtension, search, 
    //booleans:
    includeFoldersWithResults, doNotExploreMatch, doNotExploreChildFolders, debug, exact, readmeOnTop, includeStats, includeMetaData, ignoreSuffix, cancelRecursionOn, } = config;
    // NB: we know we only use this function like this
    const subExtensions = makeArray(subExtension);
    const extensions = makeArray(extension);
    const searches = makeArray(search);
    const ignores = makeArray(ignore);
    const contents = await fsPromises.readdir(basePath, {
        withFileTypes: true,
        encoding: "utf8",
    });
    // NB: if there's a readme and readmeOnTop is true, make sure it ends up on top
    const readmeIndex = readmeOnTop
        ? contents.findIndex((x) => x.name.toLowerCase() === "readme.md")
        : -1;
    const sortedContents = readmeIndex !== -1
        ? [contents[readmeIndex], ...removeIndexFromArray(contents, readmeIndex)]
        : contents;
    const pathArray = sortedContents.map((x) => path.join(basePath, x.name));
    // if contents should not be explored, return an empty array
    if (cancelRecursionOn?.(pathArray)) {
        return includeFoldersWithResults
            ? [{ path: basePath, isCancelRecursionResult: true, isFolder: false }]
            : [];
    }
    if (debug) {
        console.log(`contents contains ${sortedContents.length} files/folders`);
    }
    const textJsonPromises = sortedContents.map(async (dirent) => {
        // don't check files if search level is folder
        if (searchLevel === "folder" && dirent.isFile()) {
            return null;
        }
        //if dir/file name should be ignored, skip it
        if (ignores.includes(dirent.name)) {
            if (debug)
                console.log("Ignoring", dirent.name);
            return null;
        }
        const subExtension = getSubExtension(dirent.name);
        // if we want specific sub-extensions and this file isn't one of them, return
        if (dirent.isFile() &&
            subExtensions &&
            subExtensions.length > 0 &&
            !subExtensions.find((ext) => subExtension === ext)) {
            if (debug) {
                console.log(`ignoring ${dirent.name} because of subextension mismatch`);
            }
            return null;
        }
        if (dirent.isFile() &&
            ignoreSuffix &&
            ignoreSuffix.length > 0 &&
            ignoreSuffix.find((suffix) => dirent.name.endsWith(suffix))) {
            if (debug)
                console.log(`ignoring ${dirent.name} because of ignored suffix`);
            return null;
        }
        // if we want specific extensions and this file isn't one of them, return
        if (dirent.isFile() &&
            extensions &&
            extensions.length > 0 &&
            !extensions.find((ext) => getExtension(dirent.name) === ext)) {
            if (debug)
                console.log(`ignoring ${dirent.name} because of extension mismatch`);
            return null;
        }
        const filePath = path.join(basePath, dirent.name);
        // if it's a file, we don't go into recursion.
        if (dirent.isFile()) {
            const ext = getExtension(dirent.name) || "";
            //getting extension
            const isJson = jsonExtensions.includes(ext);
            const isTypescript = typescriptExtensions.includes(ext);
            const isMarkdown = markdownExtensions.includes(ext);
            //NB: be careful when ever changing this logic!
            // It should never get contents when it doesn't need to,
            // because this is a very heavy operation.
            const searchContender = searchLevel === "folder"
                ? dirent.name
                : searchLevel === "fileName"
                    ? dirent.name
                    : searchLevel === "filePath" || !isSearchContentExtension(ext)
                        ? filePath //withoutExtension? dirent.name or filePath??? we also want to match folder names before it, right?
                        : //TODO: is getOutLine() evaluated if it's not an outline? it also seems the default, which I don't like. Test this, it's an important aspect of exploring efficiently.
                            searchLevel === "outline"
                                ? getFileOutline(filePath)
                                : searchLevel === "full"
                                    ? await getContents(filePath)
                                    : "SHOULD_NEVER_HAPPEN";
            if (debug)
                console.log(`searchContender: ${searchContender}`);
            const stats = includeStats || minimumUpdatedAt
                ? await fsPromises.stat(filePath)
                : undefined;
            const match = isMatch({ exact, searchContender, searches });
            if (!match) {
                return null;
            }
            // NB: check if the file is too old
            const isTooOld = stats && minimumUpdatedAt
                ? (stats.ctimeMs || stats.mtimeMs || 0) < minimumUpdatedAt
                : false;
            if (isTooOld) {
                return null;
            }
            const json = isJson && searchLevel === "full" ? getContents(filePath) : undefined;
            const markdownJson = isMarkdown && searchLevel === "full"
                ? // TODO: get markdown parse here
                    await getContents(filePath)
                : undefined;
            // NB: TODO: we don't do typescript json yet
            // TODO: I think double special comments (like the above) on a single line isn't indexed yet, is it?
            const typescriptJson = isTypescript ? undefined : undefined;
            if (debug) {
                console.log(`${dirent.name}? match ${match}`);
            }
            //match found...
            const matchOrNot = [
                {
                    path: filePath,
                    json,
                    isFolder: false,
                    markdownJson,
                    typescriptJson,
                    stats: stats
                        ? {
                            createdAt: stats.ctimeMs,
                            updatedAt: stats.mtimeMs,
                        }
                        : undefined,
                },
            ];
            return matchOrNot;
        }
        // ^ these were all the base cases ^. Now the recursion.
        if (dirent.isDirectory() && !doNotExploreChildFolders) {
            let results = [];
            let shouldRecurse = true;
            const stats = includeStats || minimumUpdatedAt
                ? await fsPromises.stat(filePath)
                : undefined;
            // NB: check if the file is too old
            const isTooOld = stats && minimumUpdatedAt
                ? (stats.ctimeMs || stats.mtimeMs || 0) < minimumUpdatedAt
                : false;
            if (isTooOld) {
                return null;
            }
            if (searchLevel === "folder") {
                const searchContender = dirent.name;
                const match = isMatch({ searchContender, exact, searches });
                if (match) {
                    results.push({
                        path: filePath,
                        isFolder: true,
                    });
                    shouldRecurse = !doNotExploreMatch;
                }
            }
            /**
           don't dive into folder if:
          - we're looking for folders
          - the folder has matched
          - we don't explore matches
          */
            if (shouldRecurse) {
                const thisFolderPath = path.join(basePath, dirent.name);
                const thisFolderResults = await findFilesRecursively({
                    basePath: thisFolderPath,
                    extension,
                    search,
                    searchLevel,
                    subExtension,
                    ignore,
                    debug,
                    exact,
                    // NB: I think we just need to fill in everything in the recursion, right?
                    cancelRecursionOn,
                    includeFoldersWithResults,
                    includeMetaData,
                    includeStats,
                    doNotExploreChildFolders,
                    doNotExploreMatch,
                });
                if (thisFolderResults.length > 0) {
                    results = results.concat(thisFolderResults);
                    if (includeFoldersWithResults) {
                        // NB: we can't show any stats because this fs.stats function only works on files. We could sum all stats recursively
                        // TODO: should use calcualtePathMetaData here, but we first need to do some more stuff before this can be done... calcualtePathMetaData probably needs to receive a full path instead of a operationFolderPath + relativePath because it can be used outside of operations as well...
                        const metaData = undefined;
                        const folderResult = {
                            path: thisFolderPath,
                            metaData,
                            isFolder: true,
                        };
                        results.push(folderResult);
                    }
                }
            }
            return results;
        }
        return null;
    });
    const allMatches = (await Promise.all(textJsonPromises))
        .filter(notEmpty)
        .flat();
    return allMatches;
};
export const findAllDotGitFolders = (config) => {
    return explore({
        basePath: config?.basePath,
        search: ".git",
        exact: true,
        searchLevel: "folder",
        doNotExploreMatch: true,
        // I guess we can assume there will never be git folders inside an operation on a deeper level, that would be strange... Therefore, these can be ignored
        ignore: ["node_modules", "build", ".next", "src", "assets", "data"],
    });
};
/**
 find all active git folders (folders having `.git`)
 */
export const exploreGitRepoFolders = async (config) => {
    return (await findAllDotGitFolders(config))
        .map((textJson) => textJson.path)
        .map((p) => path.resolve(p, ".."));
};
export const explorePreset = (preset, config) => {
    const basePath = config?.basePath;
    const searchConfigs = preset === "packages"
        ? [
            {
                basePath,
                search: "package.json",
                exact: true,
                extension: "json",
                ignore: generatedFolders,
            },
        ]
        : preset === "markdown"
            ? [
                {
                    basePath,
                    extension: ["md", "mdx"],
                    ignore: generatedFolders,
                },
            ]
            : preset === "todo"
                ? // finds all `*.todo.md`,` todo/**/*.md` and returns the path + content
                    [
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            search: "/todo/",
                            searchLevel: "filePath",
                            ignore: generatedFolders,
                        },
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            search: "todo.md",
                            exact: true,
                            searchLevel: "fileName",
                            ignore: generatedFolders,
                        },
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            subExtension: "todo",
                            exact: false,
                            searchLevel: "fileName",
                            ignore: generatedFolders,
                        },
                    ]
                : preset === "docs"
                    ? [
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            search: "/docs/",
                            searchLevel: "filePath",
                            ignore: generatedFolders,
                        },
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            search: "readme.md",
                            exact: true,
                            searchLevel: "fileName",
                            ignore: generatedFolders,
                        },
                        {
                            basePath,
                            extension: ["md", "mdx"],
                            subExtension: ["readme"],
                            exact: false,
                            searchLevel: "fileName",
                            ignore: generatedFolders,
                        },
                    ]
                    : preset === "src"
                        ? [
                            {
                                basePath,
                                searchLevel: "folder",
                                exact: true,
                                search: "src",
                                doNotExploreMatch: true,
                                ignore: generatedFolders,
                            },
                        ]
                        : [];
    const textJsons = exploreMultiple(searchConfigs);
    return textJsons;
};
/**
 * DEPRECATED: not sure if we still need it, look up usecases, can prob be replaced now
 */
export const exploreMultiple = async (searchConfigs) => {
    const textJsonPromises = searchConfigs.map(async (config) => {
        return explore(config);
    });
    return (await Promise.all(textJsonPromises)).flat();
};
//# sourceMappingURL=explore.js.map