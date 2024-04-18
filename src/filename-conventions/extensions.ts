export const typescriptExtensionsConst = ["ts", "tsx"] as const;
export const markdownExtensionsConst = ["md", "mdx"] as const;
export const jsonExtensionsConst = ["json"] as const;
export const typescriptExtensions: string[] = [...typescriptExtensionsConst];
export const markdownExtensions: string[] = [...markdownExtensionsConst];
export const jsonExtensions: string[] = [...jsonExtensionsConst];

/**
 * Type of content that can be interpreted by the `writer-input`
 */
export type WriterType = "typescript" | "markdown" | "other";

/**
 * Gets the writer type based on the extension
 */
export const getWriterType = (extension: string | undefined): WriterType => {
  if (!extension) return "other";
  if (typescriptExtensions.includes(extension)) return "typescript";
  if (markdownExtensions.includes(extension)) return "markdown";
  return "other";
};

export type TypescriptExtension = (typeof typescriptExtensions)[number];
export type MarkdownExtension = (typeof markdownExtensions)[number];
export type JsonExtension = (typeof jsonExtensions)[number];
export type SearchableExtension =
  | TypescriptExtension
  | MarkdownExtension
  | JsonExtension;

/**
 * these filetypes should never be opened with explore. They should be processed and either indexed or converted. This creates a md or json with the proper metadata, which, in turn, can be explored.
 */
export type DropboxExtension =
  | "doc"
  | "docx"
  | "csv"
  | "xls"
  | "xlsx"
  | "epub"
  | "pdf";

export type SearchLevel =
  | "folder"
  | "fileName"
  | "filePath"
  | "outline"
  | "full";

export type FileTypeEnum = "code" | "data" | "text";

export const extensions: {
  [key in FileTypeEnum]: readonly SearchableExtension[];
} = {
  code: typescriptExtensions,
  data: jsonExtensions,
  text: markdownExtensions,
};

export const allowedSearchContentExtensions = [
  ...typescriptExtensions,
  ...markdownExtensions,
  ...jsonExtensions,
];

export const fileTypes = Object.keys(extensions) as FileTypeEnum[];

export const codeExtensions = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "php",
  "c",
  "h",
  "swift",
  "map",
];
