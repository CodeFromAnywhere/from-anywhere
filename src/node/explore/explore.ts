import {
  FileTypeEnum,
  SearchLevel,
  SearchableExtension,
  allowedSearchContentExtensions,
  extensions,
  fileTypes,
  generatedFolders,
  jsonExtensions,
  markdownExtensions,
  typescriptExtensions,
} from "../../filename-conventions/index.js";
import fs from "node:fs";
import path from "node:path";
const fsPromises = fs.promises;
import { getExtension } from "../../fs-util-js/js.js";
import { MarkdownParse, TextJson } from "../../types/index.js";
import { canRead, canSee } from "../fs-util/files.js";
import { makeArray, notEmpty } from "../../general.js";
import { getProjectRoot } from "../get-path/getProjectRoot.js";
import { Dirent } from "../fs-util/fs.js";
import { removeIndexFromArray } from "../../array-modifications.js";
import { getSubExtension } from "../../fs-util-js/getSubExtension.js";
import { readJsonFile } from "../fs-util/readJsonFile.js";

export type BaseConfig = undefined | { basePath?: string | string[] };

/**
 * type checker for a string to be an extension that can be searched for
 */
const isSearchContentExtension = (
  extension: string,
): extension is SearchableExtension => {
  return allowedSearchContentExtensions
    .map((x) => x as string)
    .includes(extension);
};
/**
 * returns the file type or null if it's unknown
 */
export const determineFileType = (filePath: string): FileTypeEnum | null => {
  const extension = path.parse(filePath).ext.substring(1);
  if (!isSearchContentExtension(extension)) return null;
  const index = fileTypes.findIndex((fileType) =>
    extensions[fileType].includes(extension),
  );
  const fileType = fileTypes[index];
  return fileType;
};

/**
 *
 */
const getFileOutline = (filePath: string) => {
  console.log("outline is currently just filename");
  return filePath.split("/").pop();
};

const isMatch = ({
  exact,
  searchContender,
  searches,
}: {
  exact: boolean | undefined;
  searches: string[];
  searchContender: string;
}) => {
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
const getContents = async (filePath: string) => {
  // console.log("Get contents", filePath);
  const extension = getExtension(filePath);
  if (!isSearchContentExtension(extension)) {
    return;
  }

  if (extension === "json") {
    return readJsonFile<any>(filePath);
    // } else if (markdownExtensions.includes(extension)) {
    //   const contents = await fsPromises.readFile(filePath, "utf8");
    //   const markdownParse = mdToJsonParse(contents);
    //   return markdownParse;
  } else {
    const fileString = fsPromises.readFile(filePath, "utf8");
    return fileString;
  }
};

export type SearchConfig = {
  minimumUpdatedAt?: number;
  /**
   * if true, the folder paths that contain matches will also be returned
   *
   * e.g. if there's a match in `/x/y/z/a.ts`, the result will include `/x`, `/x/y`, and `/x/y/z` as well, on top of just `/x/y/z/a.ts`
   */
  includeFoldersWithResults?: boolean;

  ignoreSuffix?: string[];
  /**
   * if true, readme files will return the first in every folder
   */
  readmeOnTop?: boolean;
  /**
   * defaults to fileName
   */
  searchLevel?: SearchLevel;
  /**
   * basePath (defaults to king os base directory)
   * if some of the basepaths don't exist or are not accessible, it will not search them (it filters them out)
   */
  basePath?: string | string[];
  /**
   * if given, files are filtered on their extension. must be an extension without dot (.) so md, ts, or html.
   */
  extension?: SearchableExtension | SearchableExtension[];
  /**
   * search query
   */
  search?: string | string[];

  /**
   * if given, the files will be filtered because they require containing one of these subextensions
   */
  subExtension?: string | string[];
  /**
   * if we are ignoring fileNames or folders and this fileName fits that, return
   */
  ignore?: string | string[];

  /**
   * if true, doesn't recurse on children if parent is a match
   * (only applies to SearchLevel "folder")
   */
  doNotExploreMatch?: boolean;

  /**
   * if true, doesn't explore child folders (so only the stuff that's in the basePath)
   */
  doNotExploreChildFolders?: boolean;
  /**
   * takes a callback that takes the array of dirents for the folder that is being explored and should return a boolean that, if true, makes the exploration of this folder be cancelled
   */
  cancelRecursionOn?: (pathArray: string[]) => boolean;

  /**
   * whether it should log what it's doing
   */
  debug?: boolean;
  /**
   * if true, the search has to match the file/contents exactly
   */
  exact?: boolean;
  /**
   * if true, filestats will be included in result
   */
  includeStats?: boolean;
  /**
   * TODO: Implement this
   *
   * if true, metadata will be included in the result
   */
  includeMetaData?: boolean;
};

/**
 * This is the safe and friendly version of `findFilesRecursively`
 */
export const explore = async ({
  basePath,
  searchLevel = "fileName",
  debug,
  ...other
}: SearchConfig): Promise<TextJson[]> => {
  /** accessability depends on whether we need to be able to read the file, or just see it */
  const canAccess = async (p: string) =>
    await (searchLevel === "outline" || searchLevel === "full"
      ? canRead
      : canSee)(p);

  /** basepaths becomes an array of only the basepaths that we can access */
  const accessibleBasePaths = makeArray(basePath || getProjectRoot())
    .filter(fs.existsSync)
    .filter(canAccess);

  if (debug) console.log(`finding files in ${accessibleBasePaths.join(",")}`);

  const textJsonPromises = accessibleBasePaths.map(async (p) =>
    findFilesRecursively({
      basePath: p,
      searchLevel,
      debug,
      ...other,
    }),
  );

  const textJsons = (await Promise.all(textJsonPromises)).flat();

  return textJsons;
};

/**
Explores your files with many possibilities.

NB: this function only searches one basePath, while explore can do multiple

TODO: since this not only finds files but also explores them, naming should be exploreFilesRecursively, probably.

TODO: TextJson[] is a bit weird name for the resulting type interface...
*/
export const findFilesRecursively = async (
  config: Omit<SearchConfig, "basePath"> & {
    // this is the only difference compared to the other searchconfig
    basePath: string;
  },
): Promise<TextJson[]> => {
  const {
    basePath,
    ignore,
    minimumUpdatedAt,
    searchLevel,
    extension,
    subExtension,
    search,
    //booleans:
    includeFoldersWithResults,
    doNotExploreMatch,
    doNotExploreChildFolders,
    debug,
    exact,
    readmeOnTop,
    includeStats,
    includeMetaData,
    ignoreSuffix,
    cancelRecursionOn,
  } = config;

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
  const sortedContents: Dirent[] =
    readmeIndex !== -1
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

  const textJsonPromises: Promise<TextJson[] | null>[] = sortedContents.map(
    async (dirent) => {
      // don't check files if search level is folder
      if (searchLevel === "folder" && dirent.isFile()) {
        return null;
      }

      //if dir/file name should be ignored, skip it
      if (ignores.includes(dirent.name)) {
        if (debug) console.log("Ignoring", dirent.name);
        return null;
      }

      const subExtension = getSubExtension(dirent.name);

      // if we want specific sub-extensions and this file isn't one of them, return
      if (
        dirent.isFile() &&
        subExtensions &&
        subExtensions.length > 0 &&
        !subExtensions.find((ext) => subExtension === ext)
      ) {
        if (debug) {
          console.log(
            `ignoring ${dirent.name} because of subextension mismatch`,
          );
        }
        return null;
      }

      if (
        dirent.isFile() &&
        ignoreSuffix &&
        ignoreSuffix.length > 0 &&
        ignoreSuffix.find((suffix) => dirent.name.endsWith(suffix))
      ) {
        if (debug)
          console.log(`ignoring ${dirent.name} because of ignored suffix`);
        return null;
      }

      // if we want specific extensions and this file isn't one of them, return
      if (
        dirent.isFile() &&
        extensions &&
        extensions.length > 0 &&
        !extensions.find((ext) => getExtension(dirent.name) === ext)
      ) {
        if (debug)
          console.log(`ignoring ${dirent.name} because of extension mismatch`);
        return null;
      }

      const filePath: string = path.join(basePath, dirent.name);

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

        const searchContender =
          searchLevel === "folder"
            ? dirent.name
            : searchLevel === "fileName"
            ? dirent.name
            : searchLevel === "filePath" || !isSearchContentExtension(ext)
            ? filePath //withoutExtension? dirent.name or filePath??? we also want to match folder names before it, right?
            : //TODO: is getOutLine() evaluated if it's not an outline? it also seems the default, which I don't like. Test this, it's an important aspect of exploring efficiently.
            searchLevel === "outline"
            ? getFileOutline(filePath)!
            : searchLevel === "full"
            ? await getContents(filePath)
            : "SHOULD_NEVER_HAPPEN";

        if (debug) console.log(`searchContender: ${searchContender}`);

        const stats =
          includeStats || minimumUpdatedAt
            ? await fsPromises.stat(filePath)
            : undefined;

        const match = isMatch({ exact, searchContender, searches });

        if (!match) {
          return null;
        }

        // NB: check if the file is too old
        const isTooOld =
          stats && minimumUpdatedAt
            ? (stats.ctimeMs || stats.mtimeMs || 0) < minimumUpdatedAt
            : false;
        if (isTooOld) {
          return null;
        }

        const json: any | undefined =
          isJson && searchLevel === "full" ? getContents(filePath) : undefined;

        const markdownJson: MarkdownParse | undefined =
          isMarkdown && searchLevel === "full"
            ? // TODO: get markdown parse here
              await getContents(filePath)
            : undefined;

        // NB: TODO: we don't do typescript json yet
        // TODO: I think double special comments (like the above) on a single line isn't indexed yet, is it?
        const typescriptJson: undefined = isTypescript ? undefined : undefined;

        if (debug) {
          console.log(`${dirent.name}? match ${match}`);
        }
        //match found...
        const matchOrNot: TextJson[] = [
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
        let results: TextJson[] = [];
        let shouldRecurse = true;

        const stats =
          includeStats || minimumUpdatedAt
            ? await fsPromises.stat(filePath)
            : undefined;

        // NB: check if the file is too old
        const isTooOld =
          stats && minimumUpdatedAt
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

              const folderResult: TextJson = {
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
    },
  );

  const allMatches = (await Promise.all(textJsonPromises))
    .filter(notEmpty)
    .flat();

  return allMatches;
};

export const findAllDotGitFolders = (config: BaseConfig) => {
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
export const exploreGitRepoFolders = async (config: BaseConfig) => {
  return (await findAllDotGitFolders(config))
    .map((textJson) => textJson.path)
    .map((p) => path.resolve(p, ".."));
};

export const explorePreset = (
  preset: "packages" | "markdown" | "todo" | "docs" | "src" | "git",
  config?: BaseConfig,
) => {
  const basePath = config?.basePath;

  const searchConfigs: SearchConfig[] =
    preset === "packages"
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
export const exploreMultiple = async (searchConfigs: SearchConfig[]) => {
  const textJsonPromises = searchConfigs.map(async (config) => {
    return explore(config);
  });

  return (await Promise.all(textJsonPromises)).flat();
};
