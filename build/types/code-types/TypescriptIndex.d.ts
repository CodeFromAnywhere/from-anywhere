import { TsFunction } from "../function-types/index.js";
import { TsIndexModelType } from "../model-types/index.js";
import { TsExport } from "./TsExport.js";
import { TsImport } from "./TsImport.js";
import { TsInterface } from "./TsInterface.js";
import { TsVariable } from "./TsVariable.js";
/**
 * TODO:
 *
 * Any interface/type
 * - should be able to have default values
 * - should be able to have validation functions
 * - should be able to have casting functions
 * - some parameters should be hidden upon creation
 * - some should be hidden on updating
 * - some should even be hidden when listing
 *
 * This is mainly for the admin panel, but it could be integrated on the db level as well.
 * The problem is that this behavior may be app-specific, so this becomes rather opinionated if we do it on the OS level
 * Come up with an exact requirement and implementation plan.
 *
 * There are many more functionalities possible here to speed up development, not only for admin use-case.
 */
/**
 * ---
 * isDbModel: false
 * ---
 *
 * Typescript file metadata (all indexes from typescript files, together)
 *
 */
export type TypescriptIndex = {
    tsImports: TsImport[];
    tsFunctions: TsFunction[];
    tsInterfaces: TsInterface[];
    tsVariables: TsVariable[];
    tsBuildErrors: TsBuildError[];
    tsLintWarnings: TsLintWarning[];
    tsComments: any[];
    tsExports: TsExport[];
};
export type IndexModels = {
    TsBuildError: TsBuildError;
    TsLintWarning: TsLintWarning;
    TsFunction: TsFunction;
    TsVariable: TsVariable;
    TsInterface: TsInterface;
    TsComment: any;
    TsImport: TsImport;
    TsExport: TsExport;
};
export declare const typescriptIndexModels: readonly ["TsBuildError", "TsLintWarning", "TsExport", "TsImport", "TsComment", "TsInterface", "TsFunction", "TsVariable"];
/**
 * All type interfaces that are used to index stuff, which are added to the database
 *
 * NB: It's not handy to get this from the database because this is used to generate the database xD
 */
export declare const indexDbModels: readonly ["TsBuildError", "TsLintWarning", "TsExport", "TsImport", "TsComment", "TsInterface", "TsFunction", "TsVariable"];
export declare const indexDbModelFolders: string[];
export interface TsBuildError extends TsIndexModelType {
    line?: number;
    character?: number;
    message: string;
}
export interface TsLintWarning extends TsIndexModelType {
    line: number;
    character: number;
    message: string;
}
/**
 * node: node core packages like fs and path
 *
 * react: react standard packages like react, react-native, expo, react-dom, etc.
 *
 * package: packages from npm that are not classified as operations
 *
 * operation: operations from our monorepo
 *
 * internal: imports from other places in the same operation
 *
 * NB: don't confuse this with OperationClassification
 */
export type ImportClassification = "node" | "react" | "package" | "operation" | "internal";
//# sourceMappingURL=TypescriptIndex.d.ts.map