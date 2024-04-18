/**
 * can only be accessed in the OS
 */
export declare const osRootFoldersConst: readonly ["assets", "backups", "bundled", "cloned", "distributions", "memory"];
/**
 * can be accessed in projects as well as in the OS
 */
export declare const projectRootFoldersConst: readonly ["packages", "db"];
export declare const projectRootFolders: string[];
export declare const osRootFolders: string[];
export type OSRootFolder = (typeof osRootFoldersConst)[number];
export type ProjectRootFolder = (typeof projectRootFoldersConst)[number];
export declare const getRootPath: (name?: OSRootFolder | ProjectRootFolder, config?: {
    manualProjectRoot?: string;
}) => string | undefined;
//# sourceMappingURL=getRootPath.d.ts.map