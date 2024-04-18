/**
 * Trims a slash on both sides in any path
 */
export const trimSlashes = (absoluteOrRelativePath) => {
    const isFirstCharacterSlash = absoluteOrRelativePath.charAt(0) === "/";
    const isLastCharacterSlash = absoluteOrRelativePath.charAt(absoluteOrRelativePath.length - 1) === "/";
    const withoutSlashPrefix = isFirstCharacterSlash
        ? absoluteOrRelativePath.slice(1)
        : absoluteOrRelativePath;
    const withoutSlashSuffix = isLastCharacterSlash
        ? withoutSlashPrefix.slice(0, withoutSlashPrefix.length - 1)
        : withoutSlashPrefix;
    return withoutSlashSuffix;
};
//# sourceMappingURL=trimSlashes.js.map