/**
 * Finds any operations that are in scope of any path. Will do so by looking for package.json's. First down, then up from the first folder it found.
 *
 * Efficient!
 */
export declare const findOperationsInScope: (absolutePath: string) => Promise<string[] | undefined>;
//# sourceMappingURL=findOperationsInScope.d.ts.map