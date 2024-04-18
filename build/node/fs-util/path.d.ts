/// <reference types="node" resolution-mode="require"/>
import nodePath from "node:path";
export type { ParsedPath } from "node:path";
/**
 * A pruned version of node-path
 */
export declare const path: {
    relative: (from: string, to: string) => string;
    parse: (path: string) => nodePath.ParsedPath;
    basename: (path: string, suffix?: string | undefined) => string;
    dirname: (path: string) => string;
    format: (pathObject: nodePath.FormatInputPathObject) => string;
    isAbsolute: (path: string) => boolean;
    join: (...paths: string[]) => string;
    normalize: (path: string) => string;
    resolve: (...paths: string[]) => string;
};
//# sourceMappingURL=path.d.ts.map