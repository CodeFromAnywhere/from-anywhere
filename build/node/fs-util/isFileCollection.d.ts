/// <reference types="node" resolution-mode="require"/>
import { Dirent } from "node:fs";
export declare const getFileCollectionBasename: (absolutePath: string) => string;
export declare const isFileCollection: (absoluteFilePathA: string, absoluteFilePathB: string) => boolean;
/**
filter for absolute file paths to get unique file collections
 */
export declare const onlyUniqueFileCollectionsFilter: (absoluteFilePath: string, index: number, self: string[]) => boolean;
/**
 Returns a filter function
 
 Usage:
 
 ```ts
 dirents.filter(getOnlyUniqueFileCollectionsFromDirentsFilter(absolutePath))
 ```

 */
export declare const getOnlyUniqueFileCollectionsFromDirentsFilter: (absoluteFolderPath: string) => (dirent: Dirent, index: number, self: Dirent[]) => boolean;
//# sourceMappingURL=isFileCollection.d.ts.map