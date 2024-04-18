/**
 * this function does the same as kebabCase but it also does some more transformation on top
 *
 * useful for making simple URLs and filenames. Kebacase is not enough
 *
 * NB: this is no two way transformation. When slugifying something, information is lost and it cannot be converted back in the original name.
 *
 * TODO: make the tranformations that are done here into smaller util functions and make a clean function that can be ran before running every casing conversion (maybe in a config)
 */
export function slugify(string) {
    const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return string
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
}
/**
 * Slugification for filepaths in specific
 */
export function fileSlugify(string) {
    const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·,:;";
    const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz----";
    const p = new RegExp(a.split("").join("|"), "g");
    return (string
        .toString()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        // .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "")); // Trim - from end of text
}
/**
 * Besides normal delimiters, every capital letter also marks the start of a new word
 */
const splitCasingDelimiters = (word) => {
    const letters = word.split("");
    const allWords = letters.reduce((words, letter) => {
        //get the last word, we know it's always defined because of the initial value of the reduce
        const lastWord = words.pop();
        //let's also get the last letter
        const lastLetter = lastWord.substring(-1);
        const lastLetterIsLowercase = lastLetter.toUpperCase() !== lastLetter;
        // NB: numbers or special characters are not uppercase in this logic, only letters change.
        const letterIsUppercase = letter.toLowerCase() !== letter;
        /**
         * If the last letter was lowercase and the next one is uppercase
         */
        const shouldCreateNewWord = lastLetterIsLowercase && letterIsUppercase;
        const newSequence = shouldCreateNewWord
            ? [lastWord, letter]
            : [`${lastWord}${letter}`];
        const newWords = words.concat(newSequence);
        return newWords;
    }, [""]);
    return allWords;
    // if it was lowercase but it became upper, it's a new word
};
const nonCasingDelimiters = /[\s,._-]+/; //space, comma, dot, underscore, dash
export const getDelimiter = (target) => {
    if (target === "capital")
        return "_";
    if (target === "human")
        return " ";
    if (target === "kebab")
        return "-";
    if (target === "snake")
        return "_";
    return "";
};
export const capitaliseFirstLetter = (word) => {
    return word.charAt(0).toUpperCase().concat(word.substring(1));
};
const convertToTargetCasing = (word, index, target) => {
    if (target === "capital")
        return word.toUpperCase();
    if (target === "kebab" || target === "snake")
        return word.toLowerCase();
    if (target === "pascal")
        return capitaliseFirstLetter(word);
    if (target === "camel")
        return index === 0 ? word.toLowerCase() : capitaliseFirstLetter(word);
    //human case
    return index === 0 ? capitaliseFirstLetter(word) : word.toLowerCase();
};
/**
 *
 */
export const convertCase = (
/**
 * NB: texts of more than a sentence are not supported
 */
text, target) => text
    .split(nonCasingDelimiters)
    .reduce((all, word) => all.concat(splitCasingDelimiters(word)), [])
    .map((word, index) => convertToTargetCasing(word, index, target))
    .join(getDelimiter(target));
export const camelCase = (text) => convertCase(text, "camel");
export const pascalCase = (text) => convertCase(text, "pascal");
export const snakeCase = (text) => convertCase(text, "snake");
export const kebabCase = (text) => convertCase(text, "kebab");
export const capitalCase = (text) => convertCase(text, "capital");
export const humanCase = (text) => convertCase(text, "human");
/**
 * converts any string to an array of lowercase words
 *
 * format ["word1","word2","word3"] from a string of any casing.
 */
export const lowerCaseArray = (text) => {
    return kebabCase(text).split("-");
};
//# sourceMappingURL=convert-case.js.map