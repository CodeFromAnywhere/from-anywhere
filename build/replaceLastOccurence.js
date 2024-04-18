export const reverseString = (string) => {
    return string.split("").reverse().join("");
};
/**
 * Replaces the last occerence of something in a string by something else
 *
 * Example:
 *
 * ```ts
 * const result = replaceLastOccurence("theBestSlugSlugSlug", "Slug", "Slack");
 * console.log(result); // returns theBestSlugSlugSlack
 * ```
 *
 * NB: this is not the most efficient method, as it reverses the string by making it an array, twice. It can probably be done more efficiently by using `String.lastIndexOf`
 */
export const replaceLastOccurence = (string, searchValue, replaceValue) => {
    const [reversedString, reversedSearchValue, reversedReplaceValue] = [
        string,
        searchValue,
        replaceValue,
    ].map(reverseString);
    const replacedReversedString = reversedString.replace(reversedSearchValue, reversedReplaceValue);
    const replacedString = reverseString(replacedReversedString);
    return replacedString;
};
//# sourceMappingURL=replaceLastOccurence.js.map