import { byteCount } from "./byteCount.js";
/**
 * Takes a string and simply returns the amount of characters, the amount of lines and the amount of bytes
 */
export const getStringSizeSummary = (string) => {
    const characters = string.length;
    const lines = string.split("\n").length;
    const bytes = byteCount(string);
    return {
        characters,
        lines,
        bytes,
        bytesPerCharacter: bytes / characters,
        charactersPerLine: Math.round(characters / lines),
        linesPerFile: lines,
        numberOfFiles: 1,
    };
};
//# sourceMappingURL=getStringSizeSummary.js.map