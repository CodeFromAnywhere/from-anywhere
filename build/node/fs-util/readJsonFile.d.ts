import { Path } from "../../types/index.js";
/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export declare const readJsonFile: <T extends unknown>(filePath: Path | undefined) => Promise<T | null>;
/**
 * Reads and parses JSON file
 *
 * make sure to specify what type the file contains as a generic!
 */
export declare const readJsonFileSync: <T extends unknown>(filePath: Path) => T | null;
//# sourceMappingURL=readJsonFile.d.ts.map