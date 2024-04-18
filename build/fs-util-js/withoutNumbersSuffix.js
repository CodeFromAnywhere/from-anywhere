/**
 * removes the numbers at the end of a filename. E.g. "picture88" becomes "picture"
 */
export const withoutNumbersSuffix = (filename) => {
    const reverse = filename.split("").reverse();
    const firstLetterIndex = reverse.findIndex((letter) => isNaN(Number(letter)));
    if (firstLetterIndex === 0) {
        // no numbers at the end
        return filename;
    }
    const withoutNumbers = reverse.slice(firstLetterIndex).reverse().join("");
    return withoutNumbers;
};
//# sourceMappingURL=withoutNumbersSuffix.js.map