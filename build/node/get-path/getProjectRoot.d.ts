/**
 * returns project root folder path
 *
 * recursive. goes up until it finds a folder that's the project root
 *
 * if no source path is given, uses the directory name where the function is executed from as a starting point
 *
 * Super dumb! Should be known and cached in memory, globally, somehow.
 */
export declare const getProjectRoot: (fullSourcePath?: string) => string;
/** NB: This is the projectRoot directly cached! */
export declare const projectRoot: string;
//# sourceMappingURL=getProjectRoot.d.ts.map