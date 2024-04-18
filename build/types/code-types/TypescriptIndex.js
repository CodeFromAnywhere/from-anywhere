// NB: I'm creating circular imports if I start using any k-type things in convert-case, so be careful.
import { kebabCase } from "../../convert-case.js";
export const typescriptIndexModels = [
    "TsBuildError",
    "TsLintWarning",
    "TsExport",
    "TsImport",
    "TsComment",
    "TsInterface",
    "TsFunction",
    "TsVariable",
];
/**
 * All type interfaces that are used to index stuff, which are added to the database
 *
 * NB: It's not handy to get this from the database because this is used to generate the database xD
 */
export const indexDbModels = [...typescriptIndexModels];
export const indexDbModelFolders = indexDbModels
    .map(kebabCase)
    .map((f) => `${f}s`);
//# sourceMappingURL=TypescriptIndex.js.map