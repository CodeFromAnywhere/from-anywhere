import { O } from "../../types/O.js";
/**
 * Takes an absolute path to a json and a type generic and provides a map function with which you can alter that JSON (read, map, save)
 */
export declare const mapObjectJson: <T extends O, U>(absolutePath: string, mapFunction: (item: T) => U, createObjectIfNonExistent?: T | undefined) => Promise<boolean | undefined>;
//# sourceMappingURL=mapObjectJson.d.ts.map