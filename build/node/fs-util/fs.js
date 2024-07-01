// Normal deps
import gracefulFs from "node:fs";
import nodeFs from "node:fs";
import rawPromisify from "promisify-node";
import { path } from "./path.js";
const { promises } = nodeFs;
const writeFile = promises.writeFile;
const promisify = rawPromisify;
// import { cpSync } from "graceful-fs";
// Callbacks that need to be promisified
// TODO: Provide doc-comments for these functions, as they have now been lost...
const rename = promisify(gracefulFs.rename);
const lstat = promisify(gracefulFs.lstat);
const readlink = promisify(gracefulFs.readlink);
const symlink = promisify(gracefulFs.symlink);
const mkdir = promisify(gracefulFs.mkdir);
const readFile = promisify(gracefulFs.readFile);
// const writeFile = promisify(gracefulFs.writeFile);
const access = promisify(gracefulFs.access);
// const watch = promisify(gracefulFs.watch);
const appendFile = promisify(gracefulFs.appendFile);
const chmod = promisify(gracefulFs.chmod);
const chown = promisify(gracefulFs.chown);
const copyFile = promisify(gracefulFs.copyFile);
const rm = promisify(gracefulFs.rm);
const readdir = promisify(gracefulFs.readdir);
const realpath = promisify(gracefulFs.realpath);
const stat = promisify(gracefulFs.stat);
const readFileSync = gracefulFs.readFileSync;
const readdirSync = gracefulFs.readdirSync;
const writeFileSync = gracefulFs.writeFileSync;
const createReadStream = gracefulFs.createReadStream;
const gracefulFsSync = {
    readFileSync,
    readdirSync,
    writeFileSync,
    createReadStream,
};
const existsSync = gracefulFs.existsSync;
const gracefulFsNormal = {
    // sync, should be discouraged
    existsSync,
    createWriteStream: gracefulFs.createWriteStream,
    rmSync: gracefulFs.rmSync,
    accessSync: gracefulFs.accessSync,
    //cpSync,
};
// promisified stuff
const gracefulFsPromises = {
    lstat,
    readlink,
    symlink,
    rename,
    mkdir,
    readFile,
    //writeFile,
    access,
    // watch,
    appendFile,
    chmod,
    chown,
    copyFile,
    rm,
    readdir,
    realpath,
    stat,
};
const gracefulFsConstants = {
    constants: gracefulFs.constants,
};
const fsPromises = {
    // rename,
    // stat,
    // access,
    // mkdir,
    writeFile,
    // rm,
    // copyFile,
    // readdir,
    /**
     * cp from graceful doesn't copy folders for me for some reason
     *
     * NB: this is not graceful!
     */
    // cpAsync,
};
// const fixedReadFile = (...params: Parameters<typeof readFile>) => {
//   if (params[1] === "utf8") {
//     // exception
//     return Bun.file(params[0] as string).text();
//   }
//   return readFile(...params);
// };
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
export const bunCpAsync = async (source, destination, config) => {
    if (!existsSync(source)) {
        console.log("doesn't exist", source);
        return;
    }
    const stats = await stat(source);
    const isDirectory = stats.isDirectory();
    // Recursion case
    if (config?.recursive && isDirectory) {
        const files = await readdir(source);
        const paths = files.map((file) => ({
            source: path.join(source, file),
            destination: path.join(destination, file),
        }));
        if (!existsSync(destination)) {
            await mkdir(destination);
        }
        // find all files at source and run it for all of them
        await Promise.all(paths.map((x) => bunCpAsync(x.source, x.destination, config)));
        return;
    }
    // Base case, not recursive, but still folder
    if (isDirectory) {
        throw new Error("Should be a file. This is a folder");
    }
    // Base case, not recursive, and it's a file
    if (!existsSync(source)) {
        throw new Error("This file doesn't exist");
    }
    const file = await readFile(source);
    // const file = Bun.file(source);
    await writeFile(destination, file);
    // await Bun.write(destination, await file.arrayBuffer());
};
export const fs = {
    cp: bunCpAsync,
    readTextFile: (path) => {
        return fs.readFile(path, "utf8");
        // return Bun.file(path).text();
    },
    ...gracefulFsNormal,
    ...gracefulFsPromises,
    ...gracefulFsConstants,
    ...fsPromises,
    ...gracefulFsSync,
};
//# sourceMappingURL=fs.js.map