#!/usr/bin/env node
/// <reference types="node" resolution-mode="require"/>
import { Path } from "../../types/markdown-types/index.js";
import { PathLike } from "node:fs";
/**
 * JSON stringify sensor used to filter out circular deps as per this ticket: https://stackoverflow.com/questions/4816099/chrome-sendrequest-error-typeerror-converting-circular-structure-to-json
 *
 * Ended up not using it (seems to have side-effects) but could be useful to keep here
 */
export declare const censor: (censor: any) => (key: any, value: any) => any;
/**
 * writes all values in an object to the file that should be specified as key of that value
 */
export declare const writeToFiles: (fileObject: {
    [absoluteFilePath: string]: any;
}, isJson?: boolean) => Promise<void>;
/**
 * uses fs.access to determine if something can be accessed
 *
 * Check File access constants for possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.W_OK | fs.constants.R_OK).
 */
export declare const canAccess: (p: PathLike, mode: number) => Promise<boolean>;
/**
 * uses fs.access to determine if something can be accessed
 *
 * Check File access constants for possible values of mode. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. fs.constants.W_OK | fs.constants.R_OK).
 */
export declare const canAccessSync: (p: PathLike, mode: number) => boolean;
/**
 * File is visible to the calling process
 */
export declare const canSee: (p: PathLike) => Promise<boolean>;
/**
 * File is readable to the calling process
 */
export declare const canRead: (p: PathLike) => Promise<boolean>;
/**
 * File is writable to the calling process
 */
export declare const canWrite: (p: PathLike) => Promise<boolean>;
/**
 * File is executable to the calling process
 */
export declare const canExecute: (p: PathLike) => Promise<boolean>;
/**
 * File is visible to the calling process
 */
export declare const canSeeSync: (p: PathLike) => Promise<boolean>;
/**
 * File is readable to the calling process
 */
export declare const canReadSync: (p: PathLike) => boolean;
/**
 * File is writable to the calling process
 */
export declare const canWriteSync: (p: PathLike) => boolean;
/**
 * File is executable to the calling process
 */
export declare const canExecuteSync: (p: PathLike) => boolean;
/**
 * write json to a file
 *
 * makes the dir and file if they don't exist
 */
export declare const writeJsonToFile: <T extends unknown>(p: Path, data: T) => Promise<boolean>;
/**
 * write string to a file
 *
 * makes the dir and file if they don't exist
 */
export declare const writeStringToFile: (p: Path, data: string) => Promise<boolean>;
//# sourceMappingURL=files.d.ts.map