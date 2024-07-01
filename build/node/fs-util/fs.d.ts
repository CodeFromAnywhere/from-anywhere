/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
/// <reference types="bun-types" resolution-mode="require"/>
import gracefulFs from "node:fs";
import { PathLike } from "node:fs";
import { Dirent } from "node:fs";
export interface CustomPromisifyLegacy<TCustom extends Function> extends Function {
    __promisify__: TCustom;
}
export type CustomPromisify<TCustom extends Function> = CustomPromisifyLegacy<TCustom>;
export type { PathLike, Dirent };
/**
 * Implements a primitive cp for bun
 *
 * Usage:

```
bunCpAsync(
  "/path/fs-util/src",
  "/path/fs-util/src2",
  { recursive: true }
);
```

 */
export declare const bunCpAsync: (source: string, destination: string, config?: {
    recursive?: boolean;
    /** NB: not implemented yet */
    preserveTimestamps?: boolean;
}) => Promise<void>;
export declare const fs: {
    readFileSync: typeof gracefulFs.readFileSync;
    readdirSync: typeof gracefulFs.readdirSync;
    writeFileSync: typeof gracefulFs.writeFileSync;
    createReadStream: typeof gracefulFs.createReadStream;
    writeFile: typeof import("fs/promises").writeFile;
    constants: typeof gracefulFs.constants;
    lstat: typeof gracefulFs.lstat.__promisify__;
    readlink: typeof gracefulFs.readlink.__promisify__;
    symlink: typeof gracefulFs.symlink.__promisify__;
    rename: typeof gracefulFs.rename.__promisify__;
    mkdir: typeof gracefulFs.mkdir.__promisify__;
    readFile: typeof gracefulFs.readFile.__promisify__;
    access: typeof gracefulFs.access.__promisify__;
    appendFile: typeof gracefulFs.appendFile.__promisify__;
    chmod: typeof gracefulFs.chmod.__promisify__;
    chown: typeof gracefulFs.chown.__promisify__;
    copyFile: typeof gracefulFs.copyFile.__promisify__;
    rm: typeof gracefulFs.rm.__promisify__;
    readdir: typeof gracefulFs.readdir.__promisify__;
    realpath: typeof gracefulFs.realpath.__promisify__;
    stat: typeof gracefulFs.stat.__promisify__;
    existsSync: typeof gracefulFs.existsSync;
    createWriteStream: typeof gracefulFs.createWriteStream;
    rmSync: typeof gracefulFs.rmSync;
    accessSync: typeof gracefulFs.accessSync;
    cp: (source: string, destination: string, config?: {
        recursive?: boolean;
        /** NB: not implemented yet */
        preserveTimestamps?: boolean;
    }) => Promise<void>;
    readTextFile: (path: string) => Promise<string>;
};
//# sourceMappingURL=fs.d.ts.map