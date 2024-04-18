/**
 * Not regulated regarding file naming conventions
 */
export declare const unregulatedFolders: string[];
export declare const buildFolderName = "build";
export declare const databaseFolderName = "db";
export declare const sourceFolderName = "src";
export declare const indexFolderName = ".index";
export declare const nodeModulesFolderName = "node_modules";
export declare const nextBuildFolderName = ".next";
export declare const gitFolderName = ".git";
export declare const turboFolderName = ".turbo";
export declare const generatedFolders: string[];
export declare const ignorableFilenames: {
    dsStore: string;
    htaccess: string;
    iconFile: string;
};
export declare const folderNames: {
    buildFolderName: string;
    databaseFolderName: string;
    sourceFolderName: string;
    nodeModulesFolderName: string;
    nextBuildFolderName: string;
    gitFolderName: string;
    turboFolderName: string;
};
export declare const ignorableFileAndFolderNames: string[];
/**
 * subextension indicating that a file has been moved to another location
 *
 * For example, used in `watchAppleMemos`
 */
export declare const movedFileSubextension = "moved";
/**
 * This is a temporary file for conversion with ffmpeg (see ffmpeg-util)
 */
export declare const temporaryConvertedSubextension = "converted";
export declare const projectRelativeGeneratedOperationsFolder = "packages/generated";
/**
 * these special operations are generated, so should not be copied, but should be generated in the bundle after everything is copied
 */
export declare const frontendOptionalFileSubExtensions: string[];
export declare const cliFileExtension = "cli";
export declare const testFileExtension = "test";
export declare const operationUnindexableNamesOrSubExtensions: string[];
export declare const subExtensions: {
    cliFileExtension: string;
    testFileExtension: string;
};
export declare const possibleSubExtensions: string[];
/**
 * All filesystem conventions in a single object for easy access
 */
export declare const fileSystemConventions: {
    folderNames: {
        buildFolderName: string;
        databaseFolderName: string;
        sourceFolderName: string;
        nodeModulesFolderName: string;
        nextBuildFolderName: string;
        gitFolderName: string;
        turboFolderName: string;
    };
    subExtensions: {
        cliFileExtension: string;
        testFileExtension: string;
    };
};
//# sourceMappingURL=filename-conventions.d.ts.map