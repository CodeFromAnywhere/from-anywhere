import { path } from "./path.js";
import { withoutSubExtensions } from "../../fs-util-js";
import { Dirent } from "node:fs";
import { onlyUnique2 } from "../../general.js";
export const getFileCollectionBasename = (absolutePath: string) =>
  withoutSubExtensions(path.parse(absolutePath).base);

export const isFileCollection = (
  absoluteFilePathA: string,
  absoluteFilePathB: string,
): boolean =>
  path.parse(absoluteFilePathA).dir === path.parse(absoluteFilePathB).dir &&
  getFileCollectionBasename(absoluteFilePathA) ===
    getFileCollectionBasename(absoluteFilePathB);

/**
filter for absolute file paths to get unique file collections
 */
export const onlyUniqueFileCollectionsFilter = (
  absoluteFilePath: string,
  index: number,
  self: string[],
) => onlyUnique2(isFileCollection)(absoluteFilePath, index, self);

/**
 Returns a filter function
 
 Usage: 
 
 ```ts
 dirents.filter(getOnlyUniqueFileCollectionsFromDirentsFilter(absolutePath))
 ```

 */
export const getOnlyUniqueFileCollectionsFromDirentsFilter =
  (absoluteFolderPath: string) =>
  (dirent: Dirent, index: number, self: Dirent[]) =>
    onlyUnique2<Dirent>((a, b) => {
      // if (a.isDirectory() || b.isDirectory()) {
      //   // NB: directories are always unique, so should return false for the isEqualFunction
      // NB: not working! :S
      //   return false;
      // }

      return isFileCollection(
        path.join(absoluteFolderPath, a.name),
        path.join(absoluteFolderPath, b.name),
      );
    })(dirent, index, self);
