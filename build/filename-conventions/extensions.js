export const typescriptExtensionsConst = ["ts", "tsx"];
export const markdownExtensionsConst = ["md", "mdx"];
export const jsonExtensionsConst = ["json"];
export const typescriptExtensions = [...typescriptExtensionsConst];
export const markdownExtensions = [...markdownExtensionsConst];
export const jsonExtensions = [...jsonExtensionsConst];
/**
 * Gets the writer type based on the extension
 */
export const getWriterType = (extension) => {
    if (!extension)
        return "other";
    if (typescriptExtensions.includes(extension))
        return "typescript";
    if (markdownExtensions.includes(extension))
        return "markdown";
    return "other";
};
export const extensions = {
    code: typescriptExtensions,
    data: jsonExtensions,
    text: markdownExtensions,
};
export const allowedSearchContentExtensions = [
    ...typescriptExtensions,
    ...markdownExtensions,
    ...jsonExtensions,
];
export const fileTypes = Object.keys(extensions);
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
//# sourceMappingURL=extensions.js.map