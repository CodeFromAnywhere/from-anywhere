import { NestedPartial } from "../../NestedPartial.js";
import { O } from "../../types/O.js";
/**
 * Uses mergeNestedObject on a JSON file
 */
export declare const updateSingleNestedJsonFile: <T extends O>(path: string, partialNewObject: NestedPartial<T>, newObject?: T | undefined) => Promise<boolean | undefined>;
//# sourceMappingURL=updateSingleNestedJsonFile.d.ts.map