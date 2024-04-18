export declare const typescriptExtensionsConst: readonly ["ts", "tsx"];
export declare const markdownExtensionsConst: readonly ["md", "mdx"];
export declare const jsonExtensionsConst: readonly ["json"];
export declare const typescriptExtensions: string[];
export declare const markdownExtensions: string[];
export declare const jsonExtensions: string[];
/**
 * Type of content that can be interpreted by the `writer-input`
 */
export type WriterType = "typescript" | "markdown" | "other";
/**
 * Gets the writer type based on the extension
 */
export declare const getWriterType: (extension: string | undefined) => WriterType;
export type TypescriptExtension = (typeof typescriptExtensions)[number];
export type MarkdownExtension = (typeof markdownExtensions)[number];
export type JsonExtension = (typeof jsonExtensions)[number];
export type SearchableExtension = TypescriptExtension | MarkdownExtension | JsonExtension;
/**
 * these filetypes should never be opened with explore. They should be processed and either indexed or converted. This creates a md or json with the proper metadata, which, in turn, can be explored.
 */
export type DropboxExtension = "doc" | "docx" | "csv" | "xls" | "xlsx" | "epub" | "pdf";
export type SearchLevel = "folder" | "fileName" | "filePath" | "outline" | "full";
export type FileTypeEnum = "code" | "data" | "text";
export declare const extensions: {
    [key in FileTypeEnum]: readonly SearchableExtension[];
};
export declare const allowedSearchContentExtensions: string[];
export declare const fileTypes: FileTypeEnum[];
export declare const codeExtensions: string[];
//# sourceMappingURL=extensions.d.ts.map