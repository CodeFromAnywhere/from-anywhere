export type Casing = "camel" | "pascal" | "snake" | "kebab" | "capital" | "human";
/**
 * this function does the same as kebabCase but it also does some more transformation on top
 *
 * useful for making simple URLs and filenames. Kebacase is not enough
 *
 * NB: this is no two way transformation. When slugifying something, information is lost and it cannot be converted back in the original name.
 *
 * TODO: make the tranformations that are done here into smaller util functions and make a clean function that can be ran before running every casing conversion (maybe in a config)
 */
export declare function slugify(string: string): string;
/**
 * Slugification for filepaths in specific
 */
export declare function fileSlugify(string: string): string;
export declare const getDelimiter: (target: Casing) => "" | "-" | "_" | " ";
export declare const capitaliseFirstLetter: (word: string) => string;
/**
 *
 */
export declare const convertCase: (text: string, target: Casing) => string;
export declare const camelCase: (text: string) => string;
export declare const pascalCase: (text: string) => string;
export declare const snakeCase: (text: string) => string;
export declare const kebabCase: (text: string) => string;
export declare const capitalCase: (text: string) => string;
export declare const humanCase: (text: string) => string;
/**
 * converts any string to an array of lowercase words
 *
 * format ["word1","word2","word3"] from a string of any casing.
 */
export declare const lowerCaseArray: (text: string) => string[];
//# sourceMappingURL=convert-case.d.ts.map